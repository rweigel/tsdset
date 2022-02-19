var fs = require('fs');
list = expandtemplate = require(__dirname+'/lib/expandtemplate.js').expandtemplate;

opts = 
{
	template: "bdt$Y$m$dvmin.min",
	timeRange: "P2D/2000-01-01",
	debug: true
}

opts = 
{
	template: "bdt$Y$m$d${H;delta=6}vmin.min",
	timeRange: "1990-01-01/1990-01-03",
	debug: true
}

opts = 
{
	template: "bdt$Y$m$d${H;delta=6}vmin.min",
	timeRange: "2021-03-13/2021-03-15",
	debug: true
}

opts = 
{
	template: "$Y-$m-$dT${H;delta=2} $Y-$m-$dT${H;offset=2}",
	timeRange: "2016-04-01/2016-04-02",
	debug: true
}

opts = 
{
	template: "$Y-$m-${d;delta=2} ${Y;offset=0}-${m;offset=0}-${d;offset=2}",
	timeRange: "2016-03-29/2016-04-08",
	debug: true
}


console.log(opts)
list = expandtemplate(opts)
console.log(list)
console.log("")
