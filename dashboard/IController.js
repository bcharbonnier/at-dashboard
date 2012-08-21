Aria.interfaceDefinition({
	$classpath : "dashboard.IController",
	$extends : "aria.templates.IModuleCtrl",
	$interface : {
		"getDescription" : {
			$type : "Function"
		},

		"updateControl" : {
			$type : "Function"
		},
		"moveControls" : {
			$type : "Function"
		},
		"saveSettings" : {
			$type : "Function"
		},
		"loadLocalSettings" : {
			$type : "Function"
		},
		"saveLocalSettings" : {
			$type : "Function"
		},
		"updateLastVisit" : {
			$type : "Function"
		}
	},
	$events : {
		"settingsChanged" : "Raised when the settings are changed. A refresh might be needed."
	}
});
