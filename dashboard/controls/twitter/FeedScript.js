Aria.tplScriptDefinition({
	$classpath : "dashboard.controls.twitter.FeedScript",
	$prototype : {
		$afterRefresh : function () {
			$(".tweetAvatar").twipsy();
		},
		
		saveSettings : function () {
			var query = this.$getElementById("search").getValue();

			if (query && query != this.data.searchQuery) {
				this.data.searchQuery = query;
				this.moduleCtrl.saveSettings(query);
				this.moduleCtrl.performQuery();
			}
			
			// Do a refresh to change the status, mctrl notifies me of results
			this.contentRefresh();
		}
	}
});
