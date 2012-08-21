Aria.classDefinition({
	$classpath : "dashboard.controls.twitter.Controller",
	$extends : "dashboard.controls.ContainerController",
	$implements : ["dashboard.controls.twitter.IFeedController"],
	$prototype : {
		$publicInterfaceName : "dashboard.controls.twitter.IFeedController",
		
		init : function (_, cb) {
			var query = this.settings.load();
			
			//Default datamodel
			this._data = {
				searchQuery : query || "#ariatemplates",
				pending : true,
				error : null,
				messages : []
			};

			// callback now because I don't want to wait for twitter, I'll do a refresh
			this.$callback(cb);

			this.performQuery();
		},

		performQuery : function () {
			this._data.pending = true;
			var query = encodeURIComponent(this._data.searchQuery);
			aria.core.IO.jsonp({
				url : "http://search.twitter.com/search.json?q=" + query + "&amp;rpp=10&amp;page=1",
				jsonp : "callback",
				callback : {
					fn : this.onTwitterSearch,
					scope : this
				}
			});
		},

		onTwitterSearch : function (response) {
			this._data.pending = false;
			
			if (response.error) {
				this._data.error = response.error;
			} else {
				this._data.messages = response.responseJSON.results.slice(0, 10);
			}
			
			this.$raiseEvent("refresh");
		},

		contentRefresh : function () {
			this.performQuery();
		}
	}
});
