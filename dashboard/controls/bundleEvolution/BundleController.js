Aria.classDefinition({
    $classpath : "dashboard.controls.bundleEvolution.BundleController",
    $extends : "dashboard.controls.ContainerController",
    $implements : ["dashboard.controls.IController"],
    $dependencies : ["aria.utils.ScriptLoader"],
    $prototype : {
        $publicInterfaceName : "dashboard.controls.IController",

        /**
         * Initialize the datamodel, this makes a server call to get bundle evolution
         * @param {Object} _ Event, useless
         * @param {aria.core.CfgBeans.Callback} cb Initialization callback
         */
        init : function (_, cb) {
            this._data = {
                pending : true,
                stats : null
            };

            this._loadHighchart();

            this.$callback(cb);
        },

        _loadHighchart : function () {
            aria.utils.ScriptLoader.load("dashboard/controls/bundleEvolution/highcharts/highcharts.js", {
                fn : this._getBundleData,
                scope : this
            })
        },

        _getBundleData : function () {
            this.json.setValue(this._data, "pending", true);

            aria.core.IO.jsonp({
                url : __AT_privateSettings.bundleSizeUrl,
                callback : {
                    fn : this._setBundleData,
                    scope : this,
                    onerror : this._setBundleError,
                    onerrorScope : this
                }
            });
        },

        _setBundleData : function (res) {
            this.json.setValue(this._data, "stats", res.responseJSON);
            this.json.setValue(this._data, "error", false);
            this.json.setValue(this._data, "pending", false);
        },

        _setBundleError : function () {
            this.json.setValue(this._data, "error", true);
            this.json.setValue(this._data, "pending", false);
        }

    }
});