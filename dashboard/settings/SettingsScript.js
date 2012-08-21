Aria.tplScriptDefinition({
	$classpath : "dashboard.settings.SettingsScript",
	$dependencies : ["aria.utils.Array"],
	$prototype : {
		$viewReady : function() {
			$("#globalSettings").modal({
				backdrop : "static",
				show : false
			});
		},

		initView : function () {
			this.controlsView.setPageSize(3);

			return "";
		},

		toPage : function (evt, page) {
			evt.preventDefault(true);

			if (page < 0 || page >= this.controlsView.pages.length) {
				return;
			}

			if (this.controlsView.currentPageIndex != page) {
				this.controlsView.currentPageIndex = page;
				this.$refresh();
			}
		},

		isControlEnabled : function (name) {
			return aria.utils.Array.contains(this.data.settings.loaded, name);
		},

		loadControl : function (evt, name) {
			evt.preventDefault(true);

			this.moduleCtrl.updateControl(name, true);

			this.$refresh();
		},

		removeControl : function (evt, name) {
			evt.preventDefault(true);

			this.moduleCtrl.updateControl(name, false);

			this.$refresh();
		},

		closeSettings : function (evt) {
			evt.preventDefault(true);

			$("#globalSettings").modal("hide");
		},

		applySettings : function (evt) {
			var size = this.$getElementById("size").getValue();
			this.data.settings.size = parseInt(size, 10);

			evt.preventDefault(true);

			$("#globalSettings").modal("hide");
			
			// modal dialogs for controls should be removed from DOM (they are moved inside the body)
			$("body > .modalSettings").remove();

			this.moduleCtrl.saveSettings();
		}
	}
});
