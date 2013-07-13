function expandtemplate(options,callback) {
	
	var template = options.template;
	var Start    = options.start;
	var Stop     = options.stop;
	var type     = options.type;
	var check    = options.check;
	var debug    = options.debug;
	var proxy    = options.proxy;
	var side     = "client";
	
	var tic = new Date().getTime();
	var files   = [];
	var headers = [];

	if (!options.template.match(/\$|\%/)) {
		files[0] = options.template;
		if (debug)
			console.log("expandtemplate.js: No wildcards")
		finished(headers);
		return;
	}
		
	function finished(headers) {
		var elapsed = new Date().getTime() - tic;
		if (debug) {
			if (check) {
				console.log("Generated and checked " + files.length + " URLs in " + elapsed + " ms (" + Math.round(elapsed/files.length) + " ms per)");
			} else {
				console.log("Generated " + files.length + " URLs in " + elapsed + " ms (" + Math.round(files.length/elapsed) + " per ms)");
			}
		}
		if (callback) {
			callback(files,headers,options);
		} else {
			return files;
		}
	}
	
	
	function headcomplete(data,i) {
		var Nf = files.length;	
		if (!headcomplete.N) {headcomplete.N = 0;}
		headcomplete.N = headcomplete.N + 1; 
		headers[i] = data;
		if (Nf == headcomplete.N) {
		if (debug)
			console.log("expandtemplate.js: All head requests complete.");
			finished(headers,callback);
		}
	}
	
	if (type == "strftime") {
			
		if (debug) console.log("template      = " + template);

		// Remove time zone (substr(0,25)).
		var START_dateinc  = new Date(new Date(Start).toUTCString().substr(0, 25));
		var START_dateoff  = new Date(new Date(Start).toUTCString().substr(0, 25));
		var STOP_date      = new Date(new Date(Stop).toUTCString().substr(0, 25));
		if (debug) console.log("START_dateinc = " + START_dateinc);
		if (debug) console.log("STOP_dateoff  = " + STOP_date);

		var addinc = {};
		var addoff = {};

		var keys  = ["microseconds","seconds","minutes","hours","days","days","months","years"];
		var codes = ["f",           "S",      "M",      "H",    "j",   "d",   "m",     "Y"];

		// Extract increments
		for (i = 0; i < codes.length;i++)
			addinc[keys[i]] = parseInt(template.replace(new RegExp(".*\\${"+ codes[i] +";increment=([0-9].*)}.*"),"$1")) || 0;
		
		// Extract offsets
		for (i = 0; i < codes.length;i++)
			addoff[keys[i]] = parseInt(template.replace(new RegExp(".*\\${"+ codes[i] +";offset=([0-9].*)}.*"),"$1")) || 0;

		// Replace $ with % for codes with increment arguments and remove increment argument. 
		while (template.match("increment"))
			template = template.replace(new RegExp("(.*)\\${([a-z]);increment=[0-9].*}(.*)","gi"),"$1%$2$3");	
		
		// Replace $ with % for all other codes (execpt those with offset arguments).
		template = template.replace(new RegExp("\\$([a-z])","gi"),"%$1");
		
		// Remove offset argument but keep $.
		while (template.match("offset"))
			template = template.replace(new RegExp("(.*)\\${([a-z]);offset=[0-9].*}(.*)","ig"),"$1$$$2$3");
	
		//if (debug) console.log(template);
		
		function allzero(obj) {for (var prop in obj) {if (obj[prop] > 0) return false} return true}

		for (i = 0; i < codes.length;i++)
		 	if (template.match("%"+codes[i]) && allzero(addinc)) addinc[keys[i]] = 1;		 	
		//if (debug) {console.log("addinc = "); console.log(addinc);}

		for (i = 0; i < codes.length;i++)
		 	if (template.match("$"+codes[i]) && allzero(addoff)) addoff[keys[i]] = 1;
		//if (debug) {console.log("addoff = "); console.log(addoff);}
				
		var i = 0;
		START_dateoff.add(addoff);
		
		console.log(addinc)
		if (allzero(addinc)) {
			files[0] = template;
		} else {
			while (START_dateinc.isBefore(STOP_date)) {
				
				files[i] = START_dateinc.strftime(template);			
				START_dateinc.add(addinc);
				START_dateoff.add(addinc);
				files[i] = START_dateoff.strftime(files[i].replace(/\$/g,"%"));
				i = i+1;
			}
		}	
		if (!callback) return files;
		if (check) head(files,proxy,headcomplete);
		if (!check) finished(files);
		
	}
	
	if (type == "sprintf") {
		if (typeof(Start) === "string") Start = parseInt(Start);	
		if (typeof(Stop) === "string") Stop = parseInt(Stop);
			
		for (i = Start; i < Stop + 1; i++) {
			var tmps = template;
			files[i-Start] = sprintf(tmps,i);
		}
	
		if (check) head(files,proxy,headcomplete);
		if (!check) finished(files);
	}
		
}

if (exports && require){
	require("../deps/strftime");
	require("../deps/date");
	var sp = require("../deps/sprintf-0.7-beta1");
	sprintf = sp.sprintf;
	vsprintf = sp.vsprintf;
	
	exports.expandtemplate = expandtemplate;
}

