var Tests = [
	"$Y$m${d;delta=1}v$Y$m$d,2013-09-01/2013-09-05,strftime",
	"bdt$Y$m$dvmin.min,2013-09-01/2013-09-05,strftime",
	"bdt${Y;delta=1}$m$dvmin.min,1990-01-01/1990-01-10,strftime",
	"bdt${Y;delta=1}$m$dvmin.min,1990-01-01/1991-01-01,strftime",
	"bdt${Y;delta=1}$m$dvmin.min,1990-01-01/1991-01-02,strftime",
	"bdt$Y$m${d;delta=2}vmin.min,1990-01-01/1990-01-10,strftime",
	"bdt$Y$m$d${H;delta=6}vmin.min,1990-01-01/1990-01-03,strftime",
	"bdt$Y$m$d-${Y;offset=1}${m;offset=1}$dvmin.min,2000-01-01/2000-01-04,strftime",
	"bdt$Y${m;delta=2}${d;offset=1}vmin.min,2000-01-01/2000-01-04,strftime",
	"bdt$Y${m;delta=2}$dvmin.min,1990-01-01/1990-03-01,strftime",
	"AK$Y$m,2014-03-20/2014-03-30,strftime",
	"bdt199901%02dvmin.min,1/9,sprintf",
	"bdt1999010%dvmin.min,1/9,sprintf",
	"bdt1999010%dvmin.min,1/9/3,sprintf",	
	"bdt$Y$m${d;delta=3}vmin.min,2000-01-01/2000-01-07,strftime",
	"bdt$Y$m$dvmin.min,-P2D/2000-01-01,strftime",
	"bdt$Y$m$dvmin.min,P2D/2000-01-01,strftime",
	"bdt$Y$m$dvmin.min,P3D/PT2D,strftime",
	"bdt$Y$jvmin.min,2012-09-01/2012-09-03,strftime",
	"$Y$m$d-${Y;offset=0}${m;offset=0}${d;offset=1},2016-03-29/2016-04-01,strftime",
	"$Y$m${d;delta=3}-${Y;offset=0}${m;offset=0}${d;offset=2},2016-04-01/2016-04-10,strftime",
	"$Y$m$d,2016-01-01/2016-01-01T00:00:01.000,strftime",
	"$Y$m$d-$Y$m${d;offset=1},2016-01-01/2016-01-01,strftime",
	"$Y$m$d-$Y$m${d;offset=1},2016-01-01/2016-01-01T00:00:01.000,strftime",
	"$Y$m$d-$Y$m${d;offset=1},2016-01-01/2016-01-02T00:00:01.000,strftime"
];