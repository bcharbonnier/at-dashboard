Aria.classDefinition({
	$classpath : "dashboard.controls.bookmarks.LinksController",
	$extends : "dashboard.controls.ContainerController",
	$prototype : {
		init : function (evt, callback) {
			var stored = this.settings.load();
			this._data = {
				links : stored || __AT_privateSettings.usefulLinks
			};

			this.$callback(callback);
		}
	}
});
