Aria.classDefinition({
	$classpath : "dashboard.updateNotifier.NotifierController",
	$extends : "aria.templates.ModuleCtrl",
	$implements : ["dashboard.updateNotifier.INotifier"],
	$dependencies : ["aria.utils.Date"],
	$constructor : function () {
		this.$ModuleCtrl.constructor.apply(this, arguments);

		this.latestUpdates = [{
			when : "30/01/2012",
			what : "New control available! Pin-up images from the 50's."
		},{
			when : "30/01/2012",
			what : "New control available! Task List, follow the progress of the tasks to be done."
		},
		{
			when : "15/01/2012",
			what : "New control available! Random <strong>GIFs</strong> from 4gifs.com"
		},
		{
			when : "24/04/2012",
			what : "Check the performances of Aria Templates with the new <em>performances</em> control."
		}];
	},
	$prototype : {
		$publicInterfaceName : "dashboard.updateNotifier.INotifier",

		getUpdates : function (since) {
			var updates = [];
			var dateUtil = aria.utils.Date;
			var today = new Date();
			for (var i = 0, len = this.latestUpdates.length; i < len; i += 1) {
				var news = this.latestUpdates[i];
				var when = dateUtil.interpret(news.when);
				if (dateUtil.dayDifference(since, when) > 0) {
					updates.push(news);
				}
			}
			return updates;
		}
	}
});