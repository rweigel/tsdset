var fs = require('fs');
list = expandtemplate = require(__dirname+'/lib/expandtemplate.js').expandtemplate;

opts = 
{
	template: "bdt$Y$m$dvmin.min",
 	timeRange: "P2D/2000-01-01",
 	debug: true
}

console.log(opts)
list = expandtemplate(opts)
console.log(list)
console.log("")

if (0) {
	opts = 
	{
		template: "$Y$m${d;delta=2}-${Y;offset=0}${m;offset=0}${d;offset=2}",
	 	timeRange: "2016-03-29/2016-04-08",
	 	debug: true
	}
	console.log(opts)
	list = expandtemplate(opts)
	console.log(list)
}
