Aria.classDefinition({
	$classpath : "dashboard.Storage",
	$dependencies : ["aria.utils.Json"],
	$singleton : true,
	$prototype : {
		save : function (key, value) {
			if (!window.localStorage) {
				return this.$logWarn("Your browser doesn't support localStorage.");
			}

			var converted = aria.utils.Json.convertToJsonString(value, {
				maxDepth : 10,
				reversible : true,
				keepMetadata : false
			});

			if (!converted) {
				return this.$logError("Can't convert value to a reasonable object.");
			}
			return localStorage.setItem(key, converted);
		},

		load : function (key) {
			if (!window.localStorage) {
				this.$logWarn("Your browser doesn't support localStorage.");
			}

			var stored = localStorage.getItem(key);
			if (stored) {
				return aria.utils.Json.load(stored, this);
			}
		}
	}
});
