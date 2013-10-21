function expandISO8601Duration(Duration) {

	var debug = false;
	
	if (!Duration.match(/P|T/)) return Duration;
	debug = true;
	var Durationo = Duration;
	var years = 0;
	var months = 0;
	var days = 0;
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	if (Duration.match("P")) {
		var sign    = parseInt(Duration.replace(/(.*)P.*/,"$11"));
		var years   = sign*parseInt(Duration.replace(/.*?([0-9]*)Y.*/,"$1"));
		var months  = sign*parseInt(Duration.replace(/.*?([0-9]*)M.*/,"$1"));
		var days    = sign*parseInt(Duration.replace(/.*?([0-9]*)D.*/,"$1"));
	}
	if (Durationo.match("T")) {
		var hours   = sign*parseInt(Durationo.replace(/.*?([0-9]*)H.*/,"$1"));
		var minutes = sign*parseInt(Durationo.replace(/.*?([0-9]*)M.*/,"$1"));
		var seconds = sign*parseInt(Durationo.replace(/.*?([0-9]*)S.*/,"$1"));
	}

	
	if (debug) console.log(new Date().toISOString())
	if (debug) console.log({years:years,months:months,days:days,hours:hours,minutes:minutes,seconds:seconds});
	Duration = new Date(new Date().toISOString()).add({years:years,months:months,days:days,hours:hours,minutes:minutes,seconds:seconds});
	if (debug) console.log(Duration.toISOString())
	
	return Duration.toISOString();
}

