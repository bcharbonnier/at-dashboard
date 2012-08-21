Aria.classDefinition({
	$classpath : "dashboard.controls.tasklist.TaskController",
	$extends : "dashboard.controls.ContainerController",
	$implements : ["dashboard.controls.tasklist.ITask"],
	$dependencies : ["dashboard.DB"],
	$prototype : {
		$publicInterfaceName : "dashboard.controls.tasklist.ITask",

		init : function (_, cb) {
			this._dbo = dashboard.DB.create("tasklist", "tasks");

			this._data = {
				loading : true,
				error : false,
				settingsError : false,
				tasks : [],
				"view:task" : "",
				"view:settingtask" : ""
			};

			this.$callback(cb);

			this.fetch();
		},

		fetch : function () {
			this.json.setValue(this._data, "loading", true);

			this._dbo.find({}, {
				fn : this.onFetch,
				scope : this
			});
		},

		remove : function (task) {
			this.json.setValue(this._data, "loading", true);

			var parent = this._data["view:settingtask"];
			if (parent) {
				var position = -1;
				for (var i = 0, len = parent.subtasks.length; i < len; i += 1) {
					if (parent.subtasks[i] == task) {
						position = i;
						break;
					}
				}
				if (position == -1) {
					this.$logError("Couldn't find the subtask to remove");
				}
				parent.subtasks.splice(position, 1);

				this._dbo.update(this.json.removeMetadata(parent), {
					fn : this.parseErrorAndFetch,
					scope : this
				});
			} else {

				this._dbo.remove(task, {
					fn : this.parseErrorAndFetch,
					scope : this
				});
			}
		},

		add : function (task, parent) {
			this.json.setValue(this._data, "loading", true);

			var newTask = {
				name : task,
				complete : false,
				subtasks : []
			};

			if (parent) {
				parent.subtasks.push(newTask);

				this._dbo.update(this.json.removeMetadata(parent), {
					fn : this.parseErrorAndFetch,
					scope : this
				});
			} else {
				this._dbo.save(newTask, {
					fn : this.parseErrorAndFetch,
					scope : this
				});
			}
		},

		onFetch : function (result) {
			if (result.error) {
				this._data.error = result.error;
			} else {
				this._data.tasks = this.sort(result.data);
				this._data.error = false;
				this._data.settingsError = false;
			}

			this.json.setValue(this._data, "loading", false);
		},

		parseErrorAndFetch : function (result) {
			if (result.error) {
				this._data.settingsError = result.error;
				this.json.setValue(this._data, "loading", false);
			} else {
				this.fetch();
			}
		},

		sort : function (source) {
			for (var i = 0, len = source.length; i < len; i += 1) {
				source[i].subtasks.sort(this._sortingAlgorithm);
			}

			source.sort(this._sortingAlgorithm);

			return source;
		},

		_sortingAlgorithm : function (first, second) {
			return first.name.localeCompare(second.name);
		},

		toggleComplete : function (task, parent) {
			task.complete = !task.complete;

			this._dbo.update(this.json.removeMetadata(parent), {
				fn : this.parseErrorAndFetch,
				scope : this
			});
		},

		contentRefresh : function () {
			this.fetch();
		}
	}
});
