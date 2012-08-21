var fs = require('fs');

var getStats = function () {
	var output = {
		versions : [],
		bundleNames : null,
        data : [],
        bundles : []
	};
	//var baseFolder = "D:/ApacheHtdocs/www/aria-templates-old/";
    var baseFolder = "O:/aria-templates-old/";
	var baseFolderStats = fs.readdirSync(baseFolder);
	var versions = extractVersions(baseFolderStats), version, bundles;
	for (var i = 0, versionsNb = versions.length; i < versionsNb; i++) {
		version = versions[i];
		bundles = getVersionStats(baseFolder + version + '/aria/');
		output.bundles.push({
			name : version,
			bundles : bundles
		});
	}
    var bundleNames = extractBundleNames(output.bundles);

    for (i = 0; i < versionsNb; i++) {
        version = versions[i];
        output.data.push({
            name : version,
            data : extractDataFromBundles(output.bundles[i].bundles, bundleNames)
        });
    }

	output.bundleNames = bundleNames;
    output.versions = versions;
	return output;

};


var extractVersions = function (baseFolderStats) {
	var output = [];
	for (var i = 0, length = baseFolderStats.length; i < length; i++) {
		folderName = baseFolderStats[i];
		if (folderName.charAt(0) != '.' && folderName.match(/^[\d.\-]+$/)) {
			output.push(folderName);
		}
	}
	output.sort(compareVersions);
	return output;
};

var compareVersions = function (first, second) {
	var firstParts = first.split(/[.\-]/);
	var secondParts = second.split(/[.\-]/);
	if (firstParts[0] != secondParts[0]) {
		return firstParts[0] - secondParts[0];
	}
	if (firstParts[1] != secondParts[1]) {
		return firstParts[1] - secondParts[1];
	}
	if (parseInt(firstParts[2], 10) != parseInt(secondParts[2], 10)) {
		return parseInt(firstParts[2], 10) - parseInt(secondParts[2], 10);
	}
	return firstParts[2] - secondParts[2];



};

var getVersionStats = function (path) {
	var files = fs.readdirSync(path);
	var bundles = extractValidBundles(files);
	return getBundlesSizes(path, bundles);
};


var extractValidBundles = function (files) {
	var output = [];
	for (var i = 0, length = files.length; i < length; i++) {
		filename = files[i];
		if (isValidFileName(filename)) {
			output.push(filename);
		}
	}

	return output;
};

var isValidFileName = function (filename) {
	var valid = true;
	valid = valid && (filename.charCodeAt(filename.length - 1) != 126);
	valid = valid && (filename.charAt(0) != '_');
	var parts = filename.split('.') || [];
	valid = valid && (parts.length > 0 && parts[parts.length-1] == 'js');
	valid = valid && (filename != "DevPackage.js");
	return valid;
};

var getBundlesSizes = function (path, bundles) {
	var output = {}, bundle, name;
	for (var i = 0, bundlesNb = bundles.length; i < bundlesNb; i++) {
		bundle = bundles[i];
		name = removeMD5(bundle);
		output[name] = fs.statSync(path + bundle).size;
	}
	return output;
};


var removeMD5 = function (filename) {
	if (filename.match(/aria-templates/)) {
		return "aria-templates";
	}
	var parts = filename.split('_');
	parts.pop();
	return parts.join('_');
};

var extractBundleNames = function (versions) {
	var bundleNames = [], bundles;
	for (var i = 0, versionsNb = versions.length; i < versionsNb; i++) {
		bundles = versions[i].bundles;
		for (var name in bundles) {
			if (bundles.hasOwnProperty(name) && bundleNames.indexOf(name) == -1) {
				bundleNames.push(name);
			}
		}
	}
	return bundleNames;
};

var extractDataFromBundles = function (bundles, reference) {
    var result = [];
    for (var i = 0, len = reference.length; i < len; i += 1) {
        var bundleName = reference[i];
        if (bundleName in bundles) {
            result.push(bundles[bundleName]);
        } else {
            result.push(0);
        }
    }
    return result;
};

exports.getStats = getStats;
