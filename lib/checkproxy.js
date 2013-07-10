function needproxy(testurl,report) {

	if (typeof(needproxy.need) !== 'undefined') {
		return needproxy.need;
	}
	
	need = true;
	console.log("needproxy.js: Trying HEAD request to test URL "+testurl);
	$.ajax({
		type: 'HEAD',
		async: false,
		timeout: 300,
		url: testurl, 
		success: function () {need = false;console.log("needproxy.js: OK.");},
		error: function () {need = true;$(report).append("<br>Failed: HEAD request to "+testurl);console.log("needproxy.js: Failed.");}
	})
	
	needproxy.need = need;
	return need;	
}

function checkproxy(testurl, proxy, report) {

	if (typeof(checkproxy.proxy) !== 'undefined') {
		return checkproxy.proxy;
	}

	$(report).text("");
	
	console.log("checkproxy.js: Trying HEAD request to proxy.");

	$.ajax({
		type: 'HEAD',
		async: false,
		timeout: 300,
		url: proxy + "http://www.google.com/", 
		success: function () {haveproxy = true;console.log("checkproxy.js: OK.");},
		error: function () {haveproxy = false;$(report).append("<br>checkproxy.js: Proxy not available at " + proxy);console.log("checkproxy.js: Proxy not available at " + proxy)}
	})

	
	if (haveproxy) {
		$(report).append("<br>checkproxy.js: Trying AJAX HEAD request to " + Proxy + testurl);
		$.ajax({
				type: 'HEAD',
				async: false,
				timeout: 300,
				url: proxy + testurl, 
				success: function () {noproxy = false;$(report).append("<br>checkproxy.js: OK.");},
				error: function () {noproxy = true;$(report).append("<br>checkproxy.js: Check test URL.");console.log("checkproxy.js: Check test URL.")}
		})
		if (noproxy) {
			$(report).show(); 
			return false;
		} else {
			return true;
		}
	} else {
		$(report).show(); 
		return false;
	}
	checkproxy.proxy = proxy;
	return proxy;
}
