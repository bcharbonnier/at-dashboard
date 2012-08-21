Aria.classDefinition({
	$classpath : "dashboard.controls.github.GitHubConnector",
	$singleton : true,
	$prototype : {
		lastConnection : null,

		repos : {},

		connect : function (cb) {
			var skipServer = true;

			if (!this.lastConnection) {
				this.lastConnection = +(new Date());

				skipServer = false;
			} else {
				var now = +(new Date());

				if (now - this.lastConnection > 60000 ) {
					// last connection more than one minute ago
					skipServer = false;
				}
			}

			if (!skipServer) {
				this.lastConnection = now;
				this._contactServer(cb);
			} else {
				this.$callback(cb);
			}
		},

		_contactServer : function (cb) {
			aria.core.IO.jsonp({
				url : "https://api.github.com/users/ariatemplates/repos",
				callback : {
					fn : this._onAllRepos,
					scope : this,
					args : cb
				}
			});
		},

		_onAllRepos : function (res, cb) {
			if (res.error) {
				return this.$logError("DAMN", res);
			}

			this.repos = res.responseJSON.data;
			if (this.repos.length == 0) {
				return this.$callback(cb);
			}

			// Now get the repos info
			this._getRepoInfo(0, cb);
		},

		_getRepoInfo : function (index, cb) {
			var repo = this.repos[index];

			if (!repo) {
				// Done with repos
				return this.$callback(cb);
			}

			aria.core.IO.jsonp({
				url : "https://api.github.com/repos/ariatemplates/" + repo.name + "/commits",
				callback : {
					fn : this._onCommit,
					scope : this,
					args : {
						id : index,
						cb : cb
					}
				}
			});
		},

		_onCommit : function (res, args) {
			var index = args.id, cb = args.cb;

			if (res.error) {
				this.$logError("DAMN", res);
			} else {
				this.repos[index].commits = res.responseJSON.data;
			}

			this._getRepoInfo(index + 1, cb);
		}
	}
});
