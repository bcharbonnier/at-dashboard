Aria.classDefinition({
	$classpath : "dashboard.DB",
	$singleton : true,
	$constructor : function () {
		this._dbs = {};
	},
	$statics : {
		MONGO_HOST : "/mongo",
		COUCH_HOST : "/couchdb"
	},
	$prototype : {
		create : function (database, collection) {
			var uri = [this.MONGO_HOST, database, collection].join("/");
			var uri = [this.COUCH_HOST, database].join("/");
			var dbo = this._dbs[uri];
			if (!dbo) {
				//this._dbs[uri] = new dashboard.dbo.MongoDB(uri);
				this._dbs[uri] = new dashboard.dbo.CouchDB(uri);
			}
			return this._dbs[uri];
		}
	}
});
Aria.classDefinition({
	$classpath : "dashboard.dbo.MongoDB",
	$constructor : function (uri) {
		this.uri = uri;
	},
	$prototype : {
		find : function (query, callback) {
			aria.core.IO.asyncRequest({
				method : "GET",
				url : this.uri + "/_find",
				callback : {
					fn : this.dbCallback,
					scope : this,
					onerror : this.networkError,
					scope : this,
					args : {
						q : query,
						cb : callback,
						hasError : this.hasErrorMissingOk
					}
				}
			});
		},

		save : function (object, callback) {
			var serialized = "docs=[" + aria.utils.Json.convertToJsonString(object, {
				maxDepth : 5,
				reversible : true,
				encodeParameters : true
			}) + "]";

			aria.core.IO.asyncRequest({
				method : "POST",
				url : this.uri + "/_insert",
				callback : {
					fn : this.dbCallback,
					scope : this,
					onerror : this.networkError,
					scope : this,
					args : {
						q : object,
						cb : callback,
						hasError : this.hasErrorSave
					}
				},
				postData : serialized
			});
		},

		remove : function (object, callback) {
			var serialized = "criteria=" + aria.utils.Json.convertToJsonString(object, {
				maxDepth : 5,
				reversible : true,
				encodeParameters : true
			});

			aria.core.IO.asyncRequest({
				method : "POST",
				url : this.uri + "/_remove",
				callback : {
					fn : this.dbCallback,
					scope : this,
					onerror : this.networkError,
					scope : this,
					args : {
						q : object,
						cb : callback,
						hasError : this.hasErrorMissingOk
					}
				},
				postData : serialized
			});
		},

		update : function (object, callback) {
			var criteria = 'criteria={"_id":{"$oid":"' + object._id.$oid + '"}}';
			var modifications = "newobj=" + aria.utils.Json.convertToJsonString(object, {
				maxDepth : 5,
				reversible : true,
				encodeParameters : true
			});

			aria.core.IO.asyncRequest({
				method : "POST",
				url : this.uri + "/_update",
				callback : {
					fn : this.dbCallback,
					scope : this,
					onerror : this.networkError,
					scope : this,
					args : {
						q : object,
						cb : callback,
						hasError : this.hasErrorMissingOk
					}
				},
				postData : criteria + "&" + modifications
			});
		},

		dbCallback : function (response, args) {
			var jsonResponse = aria.utils.Json.load(response.responseText || "{}", {});
			var results, errMessage;
			if (args.hasError(jsonResponse)) {
				errMessage = response.responseText;
				results = [];
			} else {
				results = jsonResponse.results;
			}

			this.$callback(args.cb, {
				error : errMessage,
				data : results
			});
		},

		networkError : function (response, args) {
			this.$callback(args.cb, {
				error : response
			});
		},

		hasErrorMissingOk : function (json) {
			return !(json && json.ok);
		},

		hasErrorSave : function (json) {
			return !(json && json.oids && json.oids.length == 1);
		}
	}
});
Aria.classDefinition({
	$classpath : "dashboard.dbo.CouchDB",
	$constructor : function (uri) {
		this.uri = uri;
	},
	$prototype : {
		// TODO this doesn't actually perform a query
		find : function (query, callback) {
			aria.core.IO.asyncRequest({
				method : "GET",
				url : this.uri + "/_all_docs",
				callback : {
					fn : this.dbCallback,
					scope : this,
					onerror : this.networkError,
					scope : this,
					args : {
						q : query,
						cb : callback,
						hasError : this.hasError
					}
				}
			});
		},

		save : function (object, callback) {
			var serialized = "docs=[" + aria.utils.Json.convertToJsonString(object, {
				maxDepth : 5,
				reversible : true
			}) + "]";

			var oldHeader = aria.core.IO.defaultPostHeader;
			aria.core.IO.defaultPostHeader = "application/json";
			aria.core.IO.asyncRequest({
				method : "POST",
				url : this.uri,
				callback : {
					fn : this.dbCallback,
					scope : this,
					onerror : this.networkError,
					scope : this,
					args : {
						q : object,
						cb : callback,
						hasError : this.hasErrorOkFalse
					}
				},
				postData : serialized
			});
			aria.core.IO.defaultPostHeader = oldHeader;
		},

		remove : function (object, callback) {
			var serialized = "criteria=" + aria.utils.Json.convertToJsonString(object, {
				maxDepth : 5,
				reversible : true
			});

			aria.core.IO.asyncRequest({
				method : "POST",
				url : this.uri + "/_remove",
				callback : {
					fn : this.dbCallback,
					scope : this,
					onerror : this.networkError,
					scope : this,
					args : {
						q : object,
						cb : callback,
						hasError : this.hasErrorMissingOk
					}
				},
				postData : serialized
			});
		},

		update : function (object, callback) {
			var criteria = 'criteria={"_id":{"$oid":"' + object._id.$oid + '"}}';
			var modifications = "newobj=" + aria.utils.Json.convertToJsonString(object, {
				maxDepth : 5,
				reversible : true
			});

			var oldHeader = aria.core.IO.defaultPostHeader;
			aria.core.IO.defaultPostHeader = "application/json";
			aria.core.IO.asyncRequest({
				method : "POST",
				url : this.uri + "/_update",
				callback : {
					fn : this.dbCallback,
					scope : this,
					onerror : this.networkError,
					scope : this,
					args : {
						q : object,
						cb : callback,
						hasError : this.hasErrorMissingOk
					}
				},
				postData : criteria + "&" + modifications
			});
			aria.core.IO.defaultPostHeader = oldHeader;
		},

		dbCallback : function (response, args) {
			var jsonResponse = aria.utils.Json.load(response.responseText || "{}", {});
			var results, errMessage;
			if (args.hasError(jsonResponse)) {
				errMessage = response.responseText;
				results = [];
			} else {
				results = jsonResponse.rows;
			}

			this.$callback(args.cb, {
				error : errMessage,
				data : results
			});
		},

		networkError : function (response, args) {
			this.$callback(args.cb, {
				error : response
			});
		},

		hasError : function (json) {
			return !json || json.error;
		},

		hasErrorOkFalse : function (json) {
			return !(json && json.ok);
		}
	}
});
