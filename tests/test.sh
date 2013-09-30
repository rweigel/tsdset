#!/usr/bin/sh

node app.js &

PID=$!

sleep 3

curl -s http://localhost:8001/test > tests/expandTemplate.now.txt

RESULT=`diff tests/expandTemplate.now.txt tests/expandTemplate.out.txt` 

kill $PID

exit $RESULT
