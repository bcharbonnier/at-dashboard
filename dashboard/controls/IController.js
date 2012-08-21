Aria.interfaceDefinition({
	$classpath : "dashboard.controls.IController",
	$extends : "aria.templates.IModuleCtrl",
	$interface : {
		"getKey" : {
			$type : "Function"
		},

		"getDesc" : {
			$type : "Function"
		},
		
		"saveSettings" : {
			$type : "Function"
		},
		"contentRefresh" : {
			$type : "Function"
		}
	},
	$events : {
		"refresh" : "Notify the template that a refresh is needed."
	}
});
