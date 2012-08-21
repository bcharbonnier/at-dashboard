Aria.classDefinition({
	$classpath : "dashboard.controls.gifs.FunnyController",
	$extends : "dashboard.controls.ContainerController",
	$prototype : {
		init : function (evt, callback) {
			this._data = {
				image : "",
				pending : true
			};

			this.$callback(callback);

			this.searchGIF();
		},

		searchGIF : function () {
			this._data.pending = true;
			this._data.image = "";

			aria.core.IO.asyncRequest({
				url : "http://4gifs.tumblr.com/random",
				callback: {
					fn : this.onGIFReceive,
					scope : this,
					onerror : this.searchDone,
					onerrorScope : this
				}
			});

			this.$raiseEvent("refresh");
		},

		searchDone : function () {
			this._data.pending = false;
			this.$raiseEvent("refresh");
		},

		contentRefresh : function () {
			this.searchGIF();
		},
		
		onGIFReceive : function (response) {
			try {
				var div = document.createElement("div");
				div.innerHTML = response.responseText;
				var content = div.getElementsByTagName("img");
				for (var i = 0, len = content.length; i < len; i += 1) {
					var img = content[i];
					if (img.className == "avatar" || img.src.indexOf("avatar_") > 0) {
						continue;
					}

					this._data.image = img.src;
					break;
				}
				div = null;
			} catch (ex) {}

			this.searchDone();
		}
	}
});
