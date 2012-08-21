Aria.classDefinition({
	$classpath : "dashboard.controls.github.NewsController",
	$extends : "dashboard.controls.ContainerController",
	$dependencies : ["dashboard.controls.github.GitHubConnector"],
	$prototype : {
		init : function (_, cb) {
			this._data = {
				pending : true,
				repos : []
			};

			this.gitHubConnect();

			this.$callback(cb);
		},

		onConnect : function () {
			this._data.pending = false;
			this._data.repos = dashboard.controls.github.GitHubConnector.repos;
			
			this.$raiseEvent("refresh");
		},

		contentRefresh : function () {
			this._data.pending = true;
			this.gitHubConnect();
		},

		gitHubConnect : function () {
			dashboard.controls.github.GitHubConnector.connect({
				fn : this.onConnect,
				scope : this
			});
		}
	}
})
