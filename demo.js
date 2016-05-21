var fs = require('fs');

eval(fs.readFileSync(__dirname +'/lib/expandtemplate.js', 'utf8'));

// Note that the offset needs to be applied to all associated dates. 
expandtemplate({template: "abc$Y$m$dT000000Z-${Y;offset=0}${m;offset=0}${d;offset=1}T000000Z", "timeRange": "2016-03-29/2016-04-03", debug: true}, cb)

function cb (result) {
	console.log(result)
}

// Note that the offset needs to be applied to all associated dates. 
expandtemplate({template: "abc$Y$m$dT000000Z-$Y$m${d;offset=1}T000000Z", "timeRange": "2016-03-29/2016-04-03", debug: true}, cb)

function cb (result) {
	console.log(result)
}