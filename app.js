var fs      = require('fs');

eval(fs.readFileSync(__dirname +'/lib/expandtemplate.js', 'utf8'));
eval(fs.readFileSync(__dirname +'/lib/head.js', 'utf8'));

if (typeof(process.argv[2]) !== "undefined" && isNaN(process.argv[2])) {
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
	options = parseOptions(req);
	if (options.template === "") {
		res.contentType("html");
		fs.readFile(__dirname+"/index.htm", "utf8", function (err, data) {res.send(data)})
		//runtests();
	} else {
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

//runtests("tests/ut.txt",false,false);
server.listen(port);

function runtests(testfile,dohead,debug) {
	var tests = fs.readFileSync(testfile, 'utf8').split("\n");
	var base  = "";
	var options = {};
	tests.forEach(function(test,i) {

		test = test.split(",");
		if (test[0] === '') return;

		options.template = test[0];
		options.start = test[1];
		options.stop = test[2];
		options.type = test[3];

		options.check = dohead;
		options.debug = debug;
		expandtemplate(options,printresults)});
}

function printresults(files,headers,options) {

	console.log(options.template + "," + options.start + "," + options.stop + "," + options.type)
	if (headers.length) {
		files.forEach(function(file,i) {console.log(file + " " + headers[i]["last-modified"] + " " + headers[i]["content-length"])});
	} else {
		if (files.length < 10) {
			files.forEach(function(file) {console.log(file)});
		} else {
			for (i=0;i<5;i++) console.log(files[i])
			console.log("...")
			for (i=files.length-5;i<files.length;i++) console.log(files[i])		
		}
		console.log("")
	}
}

function parseOptions(req) {

 	var options = {};
        
	function s2b(str) {if (str === "true") {return true} else {return false}}
	function s2i(str) {return parseInt(str)}

	options.template =     req.query.template || req.body.template || ""
	options.check    = s2b(req.query.check    || req.body.check    || "false");
	options.debug    = s2b(req.query.debug    || req.body.debug    || "true");
	options.type     =     req.query.type     || req.body.type     || ""
	options.start    =     req.query.start    || req.body.start    || "";
	options.stop     =     req.query.stop     || req.body.stop     || "";

	if (options.type === "") {
		if (options.template.match("$")) {
			options.type = "strftime";
		} else {
			options.type = "sprintf";
		}
	}

	console.log(options);

	return options;
}
