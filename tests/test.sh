#!/usr/bin/sh

node app.js 7998 &

PID=$!

sleep 3

#curl -s "http://localhost:7998/?template=bdt%Y%m%dvmin.min&start=-P1M&stop=-P1D"

curl -s http://localhost:7998/test > tests/expandTemplate.now.txt

RESULT=`diff tests/expandTemplate.now.txt tests/expandTemplate.out.txt` 

kill $PID

echo $RESULT

exit $RESULT
