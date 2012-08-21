Aria.tplScriptDefinition({
	$classpath : "dashboard.controls.performances.GraphScript",
	$dependencies : ["aria.utils.Array"],
	$prototype : {
		/**
		 * After every refresh, initialize again the graph only if needed
		 */
		$afterRefresh : function () {
			if (!this.data.pending && !this.data.error) {
				var seriesName = this.data["view:visibleOption"];

				this.chart = new Highcharts.StockChart({
					chart : {
						renderTo : "graphContainer"
					},

					rangeSelector : {
						selected : 1,
						buttons : [{
									type : "week",
									count : 1,
									text : "1w"
								}, {
									type : "month",
									count : 1,
									text : "1m"
								}, {
									type : "month",
									count : 3,
									text : "3m"
								}, {
									type : "month",
									count : 6,
									text : "6m"
								}, {
									type : "ytd",
									text : "YTD"
								}, {
									type : "year",
									count : 1,
									text : "1y"
								}, {
									type : "all",
									text : "All"
								}]
					},

					title : {
						text : seriesName
					},

					series : [{
								name : seriesName,
								data : this.data.lines[seriesName] || [],
								tooltip : {
									valueDecimals : 0
								}
							}]
				});
			}
		},

		/**
		 * Build the list of option for Select widget
		 * @return {Array} Array of label value options
		 */
		optionsForSelect : function () {
			var options = [];

			aria.utils.Array.forEach(this.data.categories, function (classpath) {
				options.push({
					label : classpath,
					value : classpath
				});
			});

			return options;
		},

		/**
		 * Callback for the Select widget onchange event, triggers a refresh to display a different chart
		 */
		switchView : function () {
			this.$refresh({
				outputSection : "mainContainer"
			});
		}
	}
});