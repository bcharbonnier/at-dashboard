Aria.tplScriptDefinition({
    $classpath : "dashboard.controls.bundleEvolution.BundleEvolutionScript",
    $prototype : {
        /**
         * After every refresh, initialize again the graph only if needed
         */
        $afterRefresh : function () {
            if (!this.data.pending && !this.data.error) {
                var bundle = this.data["view:selectedBundle"];

                var stats = aria.utils.Json.removeMetadata(this.data.stats);

                this.chart = new Highcharts.Chart({
                    chart : {
                        renderTo : "bundleEvolutionContainer",
                        type : "line"
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
                    series : this.formatBundle(bundle, stats.evolution[bundle], stats.versions)
                });

            }
        },

        $beforeRefresh : function () {
            if (this.chart) {
                this.chart.destroy();
                this.chart = null;
            }
        },

        getBundleOptions : function () {
            var options = [];
            for (var i = 0, len = this.data.stats.bundleNames.length; i < len; i += 1) {
                var bundle = this.data.stats.bundleNames[i];
                options.push({
                    value : bundle,
                    label : bundle
                });
            }
            return options;
        },

        formatBundle : function (name, data, versions) {
            var formatted = {
                name : name,
                data : []
            };
            for (var i = 0, len = versions.length; i < len; i += 1) {
                formatted.data.push(data[versions[i]] || 0);
            }
            return [formatted];
        }
    }
});