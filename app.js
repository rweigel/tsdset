// Command-line
// node app.js tests.txt [check] [debug]
//
// Server
// node app.js 8001;curl http://localhost:8001/app?template=&start=&stop=&type=&check=

var fs      = require('fs');

// For including external js, see also 
// http://stackoverflow.com/questions/5625569/include-external-js-file-in-node-js-app
eval(fs.readFileSync('deps/strftime.js', 'utf8'));
eval(fs.readFileSync('deps/date.js', 'utf8'));	 
eval(fs.readFileSync('deps/sprintf-0.7-beta1.js', 'utf8'));
eval(fs.readFileSync('lib/expandtemplate.js', 'utf8'));
eval(fs.readFileSync('lib/head.js', 'utf8'));

if (isNaN(process.argv[2])) {
	runtests(process.argv[2],process.argv[3] || false, process.argv[4] || false); return;
} else {
	var port = process.argv[2] || 8001;
}

// https://github.com/mikeal/request/issues/350
process.on('uncaughtException',function(error){console.log(error);});

//var url     = require('url');
var http    = require('http');
http.globalAgent.maxSockets = 100;  // Most Apache servers have this set at 100.
var request = require("request");
var	express = require('express');
var	app     = express().use(express.bodyParser());
var	server  = require("http").createServer(app);
var zlib    = require('zlib');
var qs      = require('querystring');

app.use("/deps", express.static(__dirname + "/deps"));
app.use("/lib", express.static(__dirname + "/lib"));
app.use("/tests", express.static(__dirname + "/tests"));
app.use("/html", express.static(__dirname + "/html"));

app.get('/expandDD.htm', function (req, res) {
		res.contentType("html");
		fs.readFile(__dirname+"/expandDD.htm", "utf8", function (err, data) {res.send(data)})
})

app.get('/expandTemplate.htm', function (req, res) {
		res.contentType("html");
		fs.readFile(__dirname+"/expandTemplate.htm", "utf8", function (err, data) {res.send(data)})
})
	
app.get('/', function (req, res) {
	console.log(req)
	options = parseOptions(req);
	if (options.template === "") {
		res.contentType("html");
		fs.readFile(__dirname+"/index.htm", "utf8", function (err, data) {res.send(data)})
		//runtests();
	} else {
		console.log(options);
		expandtemplate(options,printresults);
	}
	function printresults(files,headers) {
		if (headers.length) {
			files.forEach(function(file,i) {res.write(file + " " + headers[i]["last-modified"] + " " + headers[i]["content-length"] + "\n")});
		} else {
			files.forEach(function(file) {res.write(file+ "\n")});
		}
		res.end();	
	}
})

server.listen(port);

function runtests(testfile,dohead,debug) {
	var tests = fs.readFileSync(testfile, 'utf8').split("\n");
	var base  = "";
	tests.forEach(function(test,i) {
		test = test.split(",");
		if (test.length == 1) base = test[0];
		options.template = base+test[3];
		options.start = test[0];
		options.stop = test[1];
		options.type = test[2];
		options.check = dohead;
		options.debug = debug;
		expandtemplate(options,printresults)});
}

function printresults(files,headers) {

	if (headers.length) {
		files.forEach(function(file,i) {console.log(file + " " + headers[i]["last-modified"] + " " + headers[i]["content-length"])});
	} else {
		if (files.length < 10) {
			files.forEach(function(file) {console.log(file)});
		} else {
			for (i=0;i<5;i++) console.log(files[i])
			print("...")
			for (i=files.length-1;i>files.length-6;i--) console.log(files[i])		
		}
	}
}

function parseOptions(req) {

 	var options = {};
        
	function s2b(str) {if (str === "true") {return true} else {return false}}
	function s2i(str) {return parseInt(str)}

	options.template =     req.query.template ||     req.body.template  || ""
	options.check    = s2b(req.query.check)   || s2b(req.body.check)    || false;
	options.debug    = s2b(req.query.debug)   || s2b(req.body.debug)    || true;
	options.type     =     req.query.type     ||     req.body.type      || ""
	options.start    =     req.query.start    ||     req.body.start     || "";
	options.stop     =     req.query.stop     ||     req.body.stop      || "";

	if (options.type === "") {
		if (options.template.match("$")) {
			options.type = "strftime";
		} else {
			options.type = "sprintf";
		}
	}

	return options;
}
