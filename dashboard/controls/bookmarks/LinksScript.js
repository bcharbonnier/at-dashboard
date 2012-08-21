Aria.tplScriptDefinition({
	$classpath : "dashboard.controls.bookmarks.LinksScript",
	$prototype : {
		saveSettings : function () {
			this.moduleCtrl.saveSettings(this.data.links);
		},

		addLink : function (evt) {
			evt.preventDefault(true);

			var title = this.$getElementById("title"), titleValue = title.getValue();
			if (!titleValue) {
				title.classList.add("error");
				this.$getElementById("clearfix_title").classList.add("error");
			} else {
				title.classList.remove("error");
				this.$getElementById("clearfix_title").classList.remove("error");
			}

			var url = this.$getElementById("url"), urlValue = url.getValue();
			if (!urlValue) {
				url.classList.add("error");
				this.$getElementById("clearfix_url").classList.add("error");
			} else {
				url.classList.remove("error");
				this.$getElementById("clearfix_url").classList.remove("error");
			}
	
			if (titleValue && urlValue) {
				this.data.links[titleValue] = urlValue;
				this.settingsChanged();
			}
		},

		removeLink : function (evt, name) {
			evt.preventDefault(true);

			if (this.data.links[name]) {
				delete this.data.links[name];
				this.settingsChanged();
			}
		},

		settingsChanged : function () {
			this.saveSettings();
			this.contentRefresh();
			this.$refresh({
				outputSection : "removeLinks"
			});
		}
	}
});
