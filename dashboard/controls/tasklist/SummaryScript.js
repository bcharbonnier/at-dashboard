Aria.tplScriptDefinition({
	$classpath : "dashboard.controls.tasklist.SummaryScript",
	$prototype : {
		remove : function (evt, taskId) {
			evt.preventDefault(true);

			this.moduleCtrl.remove(taskId);
		},

		newTask : function (evt) {
			var task = this.$getElementById("newTask").getValue();

			if (task) {
				this.moduleCtrl.add(task, this.data["view:settingtask"]);
			}
		},

		navigate : function (evt, to) {
			evt.preventDefault(true);

			var destination = to || false;

			this.$json.setValue(this.data, "view:task", destination);
		},

		navigateSettings : function (evt, to) {
			evt.preventDefault(true);

			var destination = to || false;

			this.$json.setValue(this.data, "view:settingtask", destination);
		},

		percentageComplete : function (task) {
			var len = task.subtasks.length;
			if (len < 1) {
				return null;
			}

			var countComplete = 0;
			for (var i = 0; i < len; i += 1) {
				if (task.subtasks[i].complete) {
					countComplete += 1;
				}
			}
			
			return Math.ceil(100.0 * countComplete / len);
		},

		toggleComplete : function (evt, task) {
			evt.preventDefault(true);

			this.moduleCtrl.toggleComplete(task, this.data["view:settingtask"]);
		},

		backSettings : function (evt) {
			evt.preventDefault(true);

			this.$json.setValue(this.data, "settingsError", false);
		}
	}
});
