Aria.tplScriptDefinition({
    $classpath : "dashboard.controls.bundleEvolution.BundleEvolutionScript",
    $prototype : {
        /**
         * After every refresh, initialize again the graph only if needed
         */
        $afterRefresh : function () {
            return;
            if (!this.data.pending && !this.data.error) {
                var stats = aria.utils.Json.removeMetadata(this.data.stats);

                this.chart = new Highcharts.Chart({
                    chart : {
                        renderTo : "bundleEvolutionContainer",
                        type : "bar"
                    },
                    title : {
                        text : "Bundle Evolution"
                    },
                    xAxis : {
                        categories : stats.versions
                    },
                    yAxis : {
                        min : 0,
                        title : {
                            text : "File size in KB"
                        }
                    },
                    legend : {
                        backgroundColor : "#FFFFFF",
                        reversed : true
                    },
                    tooltip : {
                        formatter : function () {
                            return this.series.name + ": " + this.y + " KB";
                        }
                    },
                    plotOptions : {
                        series : {
                            stacking : "normal"
                        }
                    },
                    series : stats.data
                });
            }
        }
    }
});