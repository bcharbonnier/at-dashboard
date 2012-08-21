Aria.classDefinition({
	$classpath : "dashboard.controls.atdeploy.DeployController",
	$extends : "dashboard.controls.ContainerController",
	$implements : ["dashboard.controls.atdeploy.IDeploy"],
	$statics : {
		BASE_URL : __AT_privateSettings.deployUrl
	},
	$prototype : {
		$publicInterfaceName : "dashboard.controls.atdeploy.IDeploy",

		init : function (_, cb) {
			this._data = {
				pending : true,
				who : "DAVE",
				when : "",
				status : null
			};

			this.connect();

			this.$callback(cb);
		},

		connect : function () {
			var params = [];
			if (this._data.who) {
				params.push("who=" + this._data.who);
			}
			if (this._data.when) {
				params.push("when=" + this._data.when);
			}

			this._data.pending = true;
			aria.core.IO.jsonp({
				url : this.BASE_URL + "?" + params.join("&"),
				callback : {
					fn : this._statusReceive,
					scope : this
				}
			});
		},

		_statusReceive : function (response) {
			this._data.pending = false;

			if (response.error) {
				this._data.status = {
					error : true,
					errorMsg : "Unable to contact the server. (" + response.status + ")" + response.error
				}
			} else {
				this._data.status = response.responseJSON;
				this._data.status.when = new Date(this._data.status.when);
			}

			this.$raiseEvent("refresh");
		}
	}
});