var fs = require("fs");
var path = require("path");
var http = require("http");
var url = require("url");

var baseFolder = "P:/AriaTemplatesBenchmarksDave";
var destination = path.join(__dirname, "report.json");

var fileNameConvention = /_(\d+)\.csv/;
var sinceWhen = 6 * 30 * 86400000; // 86400000 are the ms in a day

var busyRunning = false;

/**
 * Function that reads the last X benchmarks and writes a CSV summary
 */
var readBenchmarks = function (callback, today) {
	busyRunning = true;

	fs.readdir(baseFolder, function (err, files) {
		if (err) {
			return callback.call(this, err);
		}

		try {
			var lines = [];
			var byCategory = {};

			files.forEach(function (file) {
				var match = file.match(fileNameConvention);

				if (match) {
					var year = parseInt(match[1].substring(0, 4), 10);
					var month = parseInt(match[1].substring(4, 6), 10) - 1;
					var day = parseInt(match[1].substring(6, 8), 10);
					var hour = parseInt(match[1].substring(8, 10), 10);
					var mins = parseInt(match[1].substring(10, 12), 10);

					var date = new Date(year, month, day, hour, mins, 0, 0);

					if (today - date < sinceWhen) {

						var data = fs.readFileSync(path.join(baseFolder, file), "utf-8").split("\n");

						data.forEach(function (line) {
							var measure = line.trim().split(",");

							if (measure.length != 2 || measure[1] === "failed") {
								return;
							}

							var category = measure[0].trim();
							var value = measure[1].trim();

							lines.push([file, measure[0].trim(), measure[1].trim()]);

							if (!byCategory[category]) {
								byCategory[category] = [];
							}

							byCategory[category].push([+date, parseInt(value, 10)]);
						});
					}
				}
			});
			busyRunning = false;

			callback.call(this, null, JSON.stringify({
				lines : lines,
				categories : byCategory
			}));
		} catch (ex) {
			busyRunning = false;

			callback.call(this, err);
		}
	});
};

/**
 * Start the server sending back the report
 */
var startServer = function () {
	http.createServer(function (req, res) {
		var parsed = url.parse(req.url, true);

		fs.readFile(destination, function (err, data) {
			try {
				var json = JSON.parse(data);
			} catch (e) {
				err = {
					message : "Invalid JSON format"
				};
			}

			if (err) {
				res.writeHead(500);
				res.end(err.message);
			} else {
				res.writeHead(200, {
					"Content-Type" : "application/json"
				});

				if (parsed.query.categories) {
					res.end(parsed.query.callback + "(" + JSON.stringify(json.categories) + ")");
				} else {
					res.end(parsed.query.callback + "(" + JSON.stringify(json.lines) + ")");
				}
			}
		});
	}).listen(8569);
	console.log("Server started");
};

var getNumberOfFiles = function () {
	var stat = fs.readdirSync(baseFolder);

	return stat.length;
};

/**
 * Start watching the folder for updates
 */
var watchFolder = function () {
	var numberOfFiles = getNumberOfFiles();

	fs.watch(baseFolder, function (event) {
		if (!busyRunning) {
			var filesNow = getNumberOfFiles();

			if (filesNow !== numberOfFiles) {
				numberOfFiles = filesNow;

				var now = new Date();

				console.log(now, "Destination folder update");

				readBenchmarks(function () {
					console.log("Report updated");
				}, now);
			}
		}
	});
};

// Initial read, this will start the server when the first report is generated
readBenchmarks(function (err, data) {
	if (err) {
		throw err;
	}
	fs.writeFile(destination, data, "utf-8", function (err) {
		if (err) {
			throw err;
		}

		startServer();

		watchFolder();
	});
}, new Date());