Aria.classDefinition({
    $classpath : "dashboard.MainController",
    $extends : "aria.templates.ModuleCtrl",
    $implements : ["dashboard.IController"],
    $dependencies : ["aria.utils.Array", "dashboard.Storage"],
    $prototype : {
        _localSettings : {},

        _controls : {},

        $publicInterfaceName : "dashboard.IController",

        init : function (_, cb) {
            this.$removeInterceptors(this.$publicInterfaceName, this, this._interceptPublicInterface);

            this._data = {
                lastVisit : new Date(2012, 00, 01)
            };

            this.availableControls();

            this.loadSettings();

            this.loadSubModules([{
                        classpath : "dashboard.updateNotifier.NotifierController",
                        refpath : "updateNotifier"
                    }], {
                fn : function (_, callback) {
                    this.checkUpdates();

                    this.$callback(callback);
                },
                scope : this,
                args : cb
            });
        },

        availableControls : function () {
            this._controls = {
                "bundleEvolution" : {
                    tpl : "dashboard.controls.bundleEvolution.BundleEvolution",
                    desc : "Evolution of the bundle sizes.",
                    mctrl : "dashboard.controls.bundleEvolution.BundleController"
                },
                "at-deploy" : {
                    tpl : "dashboard.controls.atdeploy.Status",
                    mctrl : "dashboard.controls.atdeploy.DeployController",
                    desc : "Check the status of Aria Templates deploy on nceariap1."
                },
                "tasklist" : {
                    tpl : "dashboard.controls.tasklist.Summary",
                    mctrl : "dashboard.controls.tasklist.TaskController",
                    desc : "Share a list of task with your friends on facebook! I'm joking."
                },
                "twitter" : {
                    tpl : "dashboard.controls.twitter.Feed",
                    mctrl : "dashboard.controls.twitter.Controller",
                    desc : "See what twitter says about Aria Templates."
                },
                "countdown" : {
                    tpl : "dashboard.controls.countdown.SprintInfo",
                    mctrl : "dashboard.controls.countdown.SprintController",
                    desc : "Scrum Sprint information. <br />Time to delivery, release master, ..."
                },
                "links" : {
                    tpl : "dashboard.controls.bookmarks.Links",
                    desc : "List of useful links.",
                    mctrl : "dashboard.controls.bookmarks.LinksController"
                },
                "github" : {
                    tpl : "dashboard.controls.github.News",
                    desc : "Latest news about Aria Templates organization on GitHub.",
                    mctrl : "dashboard.controls.github.NewsController"
                },
                "gh-ariatemplates" : {
                    tpl : "dashboard.controls.github.AriaTemplates",
                    desc : "Recent commits on ariatemplates repository.",
                    mctrl : "dashboard.controls.github.NewsController"
                },
                "gh-samples" : {
                    tpl : "dashboard.controls.github.Samples",
                    desc : "Recent commits on samples.ariatemplates.com repository.",
                    mctrl : "dashboard.controls.github.NewsController"
                },
                "gh-public" : {
                    tpl : "dashboard.controls.github.Public",
                    desc : "Recent commits on public.ariatemplates.com repository.",
                    mctrl : "dashboard.controls.github.NewsController"
                },
                "performances" : {
                    tpl : "dashboard.controls.performances.Graph",
                    desc : "Track the performances of NRE campaigns on DAVE.",
                    mctrl : "dashboard.controls.performances.PerformancesController"
                },
                "4gifs.com" : {
                    tpl : "dashboard.controls.gifs.Funny",
                    desc : "Random animated gifs/funny pictures from 4gifs.com.",
                    mctrl : "dashboard.controls.gifs.FunnyController"
                },
                "pinup" : {
                    tpl : "dashboard.controls.pinup.Image",
                    desc : "Images of Pin-Up from the 50's."
                }
            };

            var available = [];
            for (var control in this._controls) {
                if (this._controls.hasOwnProperty(control)) {
                    available.push({
                        name : control,
                        desc : this._controls[control].desc
                    });
                }
            }

            this._data.availableControls = available;
        },

        loadSettings : function () {
            var defaults = {
                size : 2,
                loaded : []
            };

            var settings = dashboard.Storage.load("settings");
            if (settings) {
                if (settings.size) {
                    defaults.size = settings.size;
                }
                if (settings.loaded) {
                    defaults.loaded = settings.loaded;
                }
                if (settings.local) {
                    this._localSettings = settings.local;
                }
                if (settings.lastVisit) {
                    this._data.lastVisit = new Date(settings.lastVisit);
                }
            }

            this._data.settings = defaults;
        },

        getDescription : function (key) {
            return this._controls[key];
        },

        updateControl : function (key, state) {
            if (state) {
                // set loaded
                this._data.settings.loaded.push(key);
            } else {
                var pos = aria.utils.Array.indexOf(this._data.settings.loaded, key);
                this._data.settings.loaded.splice(pos, 1);
            }
        },

        moveControls : function (who, where) {
            if (who != where) {
                var iOfWho = aria.utils.Array.indexOf(this._data.settings.loaded, who);
                var iOfWhere = aria.utils.Array.indexOf(this._data.settings.loaded, where);
                this._data.settings.loaded[iOfWho] = where;
                this._data.settings.loaded[iOfWhere] = who;

                this.saveSettings();
            }
        },

        saveSettings : function (skipNotify) {
            var storeMe = aria.utils.Json.copy(this._data.settings, true, ["size", "loaded"]);
            storeMe.local = this._localSettings;
            storeMe.lastVisit = this._data.lastVisit.toString();

            dashboard.Storage.save("settings", storeMe);

            if (!skipNotify) {
                this.$raiseEvent("settingsChanged");
            }
        },

        loadLocalSettings : function (key) {
            return this._localSettings[key];
        },

        saveLocalSettings : function (key, value) {
            this._localSettings[key] = value;
            this.saveSettings(true);
        },

        checkUpdates : function () {
            if (this._data.settings.loaded.length > 0) {
                this._data.updates = this.updateNotifier.getUpdates(this._data.lastVisit);
            } else {
                this._data.updates = [];
            }
        },

        updateLastVisit : function () {
            this._data.lastVisit = new Date();

            this.saveSettings(true);
        }
    }
});
