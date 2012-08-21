Aria.tplScriptDefinition({
	$classpath : "dashboard.controls.atdeploy.StatusScript",
	$prototype : {
		saveSettings : function () {
			var who = this.$getElementById("who").getValue();
			this.data.who = who;

			if (aria.utils.Type.isDate(this.data.when)) {
				var when = aria.utils.Date.format(this.data.when, "yyyddMM");
				this.data.when = when;
			}

			this.moduleCtrl.connect();
		}
	}
});