Aria.interfaceDefinition({
	$classpath : "dashboard.controls.tasklist.ITask",
	$extends : "dashboard.controls.IController",
	$interface : {
		remove : {
			$type : "Function"
		},

		add : {
			$type : "Function"
		},

		toggleComplete : {
			$type : "Function"
		}
	}
});
