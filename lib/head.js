if (typeof(document) === "undefined") { 
	var url     = require('url');
	var http    = require('http');
	http.globalAgent.maxSockets = 100;  // Most Apache servers have this set at 100.	
}

function head(file,i,callback) {		
	if (!(typeof(file) === "string")) {
		var callback = i;
		var Nf = file.length;
		for (i=0;i<file.length;i++) {
			head(file[i],i,callback);
		}
		return;
	}
	if (typeof(document) === "undefined") { 
		var options = {method: 'HEAD', host: url.parse(file).hostname, port: 80, path: url.parse(file).pathname};
		var req = http.request(options, function(res) {callback(res.headers,i)});
		req.on('end',function () {console.log("i complete");});
		req.on('error', function(e) {callback(e,i);});
		req.end();
	} else {			
		$.ajax({
			type: 'HEAD',
			url: file, 
			error: function () {callback(data,i)}, 
			success: function (data, textStatus, jqXHR) {callback(data,i)}});
	}
}
