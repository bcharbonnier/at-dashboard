Aria.classDefinition({
	$classpath : "dashboard.controls.performances.PerformancesController",
	$extends : "dashboard.controls.ContainerController",
	$implements : ["dashboard.controls.IController"],
	$dependencies : ["aria.utils.Object", "aria.utils.ScriptLoader"],
	$statics : {
		/**
		 * URL of the server answering our jsonp requests
		 * @type String
		 */
		SERVER_URL : __AT_privateSettings.performancesUrl
	},
	$prototype : {
		$publicInterfaceName : "dashboard.controls.IController",

		/**
		 * Initialize the datamodel, this makes a server call to get the latest CSV info
		 * @param {Object} _ Event, useless
		 * @param {aria.core.CfgBeans.Callback} cb Initialization callback
		 */
		init : function (_, cb) {
			this._data = {
				pending : true,
				error : false,
				lines : [],
				categories : []
			};

			this.$callback(cb);

			aria.utils.ScriptLoader.load("http://code.highcharts.com/stock/highstock.js", {
				fn : this._makeRequest,
				scope : this
			});
		},

		/**
		 * Make a server request for the performance report
		 */
		_makeRequest : function () {
			this.json.setValue(this._data, "pending", true);

			aria.core.IO.jsonp({
				url : this.SERVER_URL,
				callback : {
					fn : this.onGetData,
					scope : this,
					onerror : this.onGetError,
					onerrorScope : this
				}
			});
		},

		/**
		 * Callback for the JSONP request
		 * @param {Object} res Server response
		 */
		onGetData : function (res) {
			this.prepareLines(res.responseJSON);
			this.json.setValue(this._data, "pending", false);
		},

		/**
		 * Callback for the JSONP error response. Sends back an empty list of points
		 * @param {Object} res Server response
		 */
		onGetError : function (res) {
			this.json.setValue(this._data, "error", true);
			this.json.setValue(this._data, "lines", []);
			this.json.setValue(this._data, "pending", false);
		},

		/**
		 * Parse the server response and generate something usable for the graph library. What highcharts expects is
		 *
		 * <pre>
		 * [[date in ms, value], [date in ms, value],]
		 * </pre>
		 *
		 * For every possible chart
		 * @param {Object} json List of meausures
		 */
		prepareLines : function (json) {
			var categories = aria.utils.Object.keys(json);

			this.json.setValue(this._data, "categories", categories);
			this.json.setValue(this._data, "lines", json);
		}
	}
});