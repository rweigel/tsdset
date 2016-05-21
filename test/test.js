var fs = require('fs');

expandtemplate = require('../lib/expandtemplate.js').expandtemplate;
eval(fs.readFileSync(__dirname + "/tests.js", 'utf8'));

for (var i = 0;i < Tests.length; i++) {
	test = Tests[i].split(",");
	var options = {}
	options.template = test[0];
	options.timeRange = test[1];
	options.indexRange = test[1];
	options.type = test[2];
	list = expandtemplate(options)
	console.log(Tests[i])
	console.log(list.join("\n"))
	console.log("")
}

