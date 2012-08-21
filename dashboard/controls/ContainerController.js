Aria.classDefinition({
	$classpath : "dashboard.controls.ContainerController",
	$extends : "aria.templates.ModuleCtrl",
	$implements : ["dashboard.controls.IController"],
	$constructor : function (args) {
		this.$ModuleCtrl.constructor.apply(this, arguments);
		this.$removeInterceptors(this.$publicInterfaceName, this, this._interceptPublicInterface);
		
		this._contructorArgs = args;

		this.settings = args.settings;
	},
	$prototype : {
		$publicInterfaceName : "dashboard.controls.IController",
		
		init : function (_, cb) {
			this.$callback(cb);
		},

		getKey : function () {
			return this._contructorArgs.name;
		},

		getDesc : function () {
			return this._contructorArgs.desc;
		},
		
		saveSettings : function (value) {
			this.settings.save(value);
		},
		
		contentRefresh : function () {
		}
	}
});
