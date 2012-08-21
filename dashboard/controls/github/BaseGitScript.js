Aria.tplScriptDefinition({
	$classpath : "dashboard.controls.github.BaseGitScript",
	$dependencies : ["aria.utils.Date"],
	$prototype : {
		shaVisible : false,

		getRepo: function (name) {
			for (var i = 0, len = this.data.repos.length; i < len; i += 1) {
				if (this.data.repos[i].name == name) {
					return this.data.repos[i];
				}
			}

			return {
				error : "Repository " + name + " doesn't exist."
			};
		},

		formatDate : function (time) {
			var date = new Date(time);
			return aria.utils.Date.format(date, "I dd - H:m");
		},

		moreDetails : function (evt, id) {
			this.$getElementById(id).classList.setClassName("");
		},

		lessDetails : function (evt, id) {
			this.$getElementById(id).classList.setClassName("hide");
		}
	}
});
