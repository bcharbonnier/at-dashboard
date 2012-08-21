Aria.classDefinition({
	$classpath : "dashboard.controls.countdown.SprintController",
	$extends : "dashboard.controls.ContainerController",
	$implements : ["dashboard.controls.IController"],
	$dependencies : ["aria.utils.Date"],
	$prototype : {
		$publicInterfaceName : "dashboard.controls.IController",

		init : function (_, cb) {
			// reference variables
			var timeReference = new Date(2011, 10, 21);
			var initialSprint = 19;
			var masterCycle = __AT_privateSettings.developers;
			var masterOnInitialSprint = 1;

			var today = new Date();
			var utilsDate = aria.utils.Date;

			var daysPassed = utilsDate.dayDifference(timeReference, today);
			var sprintsPassed = Math.floor(daysPassed / 21);
			var sprintBegin = new Date(timeReference.getTime());
			sprintBegin.setDate(sprintBegin.getDate() + sprintsPassed * 21);
			var sprintEnd = new Date(sprintBegin.getTime());
			sprintEnd.setDate(sprintBegin.getDate() + 18); //friday
			var codeFreeze = new Date(sprintBegin.getTime());
			codeFreeze.setDate(sprintBegin.getDate() + 16); //wednesday
			var beginYear = new Date(sprintEnd.getFullYear(), 0, 1);
			var weekEnd = Math.ceil(utilsDate.dayDifference(beginYear, sprintEnd) / 7);

			var masterPassed = (sprintsPassed + masterOnInitialSprint) % masterCycle.length;

			this._data = {
				sprint : sprintsPassed + initialSprint,
				start : utilsDate.format(sprintBegin, "MMM dd"),
				end : utilsDate.format(sprintEnd, "MMM dd"),
				freeze : utilsDate.format(codeFreeze, "MMM dd"),
				master : masterCycle[masterPassed],
				week : weekEnd
			};

			this.$callback(cb);
		}
	}
});