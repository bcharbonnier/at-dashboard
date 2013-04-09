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
            var masterOnInitialSprint = __AT_privateSettings.initialMasterCounter;
            var utilsDate = aria.utils.Date;

            var sprintsPassed = this.sprintsPassed(timeReference);
            var sprintBegin = new Date(timeReference.getTime());
            sprintBegin.setDate(sprintBegin.getDate() + sprintsPassed * 21);
            var sprintEnd = new Date(sprintBegin.getTime());
            sprintEnd.setDate(sprintBegin.getDate() + 18); // friday
            var codeFreeze = new Date(sprintBegin.getTime());
            codeFreeze.setDate(sprintBegin.getDate() + 16); // wednesday
            var beginYear = new Date(sprintEnd.getFullYear(), 0, 1);
            var weekEnd = Math.ceil(utilsDate.dayDifference(beginYear, sprintEnd) / 7);

            var masterPassed = (sprintsPassed + masterOnInitialSprint) % masterCycle.length;

            this._data = {
                sprint : sprintsPassed + initialSprint,
                start : utilsDate.format(sprintBegin, "MMM dd"),
                end : utilsDate.format(sprintEnd, "MMM dd"),
                freeze : utilsDate.format(codeFreeze, "MMM dd"),
                master : masterCycle[masterPassed],
                week : weekEnd,
                candidates : this.whosOnIssues(),
                couple : this.masterCouple()
            };

            this.$callback(cb);
        },

        whosOnIssues : function () {
            var people = __AT_privateSettings.people;
            var history = __AT_privateSettings.issueHistory;

            var cumulative = {};
            var sortMe = [];

            for (var i = 0, total = people.length; i < total; i += 1) {
                cumulative[people[i]] = 0;
            }

            for (var i = 0, total = history.length; i < total; i += 1) {
                var sprint = history[i];
                for (var person in sprint) {
                    if (sprint.hasOwnProperty(person) && person in cumulative) {
                        cumulative[person] += sprint[person];

                        if (i === total - 1) {
                            // Last sprint, give a bonus
                            cumulative[person] += 3;
                        }
                    } else {
                        this.$logWarn("Cuoldn't find %1 in the list of people", person);
                    }
                }
            }

            var sorted = people.sort(function (one, two) {
                return cumulative[one] - cumulative[two];
            });

            var withInfo = [];
            for (var i = 0; i < 4; i += 1) {
                withInfo.push({
                    name : sorted[i],
                    weeks : cumulative[sorted[i]]
                });
            }

            return withInfo;
        },

        sprintsPassed : function (since) {
            var today = new Date();
            var daysPassed = aria.utils.Date.dayDifference(since, today);
            return Math.floor(daysPassed / 21);
        },

        masterCouple : function () {
            var couples = __AT_privateSettings.couples;
            var couplesRefereceTime = __AT_privateSettings.couplesRefereceTime;
            var sixWeekCounter = Math.floor(this.sprintsPassed(couplesRefereceTime) / __AT_privateSettings.couplesWeeksStep) % couples.length;

            var candidates = couples[sixWeekCounter];

            return candidates;
        }
    }
});