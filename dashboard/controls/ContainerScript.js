Aria.tplScriptDefinition({
	$classpath : "dashboard.controls.ContainerScript",
	$prototype : {
		__hideIcons : function (evt, args) {
			var ele = this.$getElementById("hideIcons");
			if (args) {
				ele.classList.setClassName("hide");
			} else {
				ele.classList.setClassName("");
			}
		},

		onModuleEvent : function (evt) {
			if (evt.name == "refresh") {
				this.__shallowRefresh();
			}
		},
		
		__settings : function (evt, args) {
			evt.preventDefault(true);
			$("#settings_" + args).modal("show");
		},

		contentRefresh : function () {
			this.moduleCtrl.contentRefresh();
			this.__shallowRefresh();
		},

		__shallowRefresh : function () {
			this.$refresh({
				outputSection : "contentSection"
			});
		},

		__applySettings : function (evt, args) {
			evt.preventDefault(true);
			if (this.saveSettings) {
				this.saveSettings();
			}
			$("#settings_" + args).modal("hide");
		},

		__closeSettings : function (evt, args) {
			evt.preventDefault(true);
			$("#settings_" + args).modal("hide");
		}
	}
});
