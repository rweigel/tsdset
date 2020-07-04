var fs = require('fs');
list = expandtemplate = require(__dirname+'/lib/expandtemplate.js').expandtemplate;

opts = 
{
	template: "abc$Y$m$d-${Y;offset=0}${m;offset=1}${d;offset=1}",
 	timeRange: "2016-03-29Z/2016-04-03Z",
 	debug: false
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
