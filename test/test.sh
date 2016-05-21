#!/usr/bin/sh

node test.js > expandTemplate.now.txt
RESULT=`diff expandTemplate.now.txt expandTemplate.ref.txt` 

if [ -z "$RESULT" ]; then
	echo "All tests passed."
	exit 0;
else
	echo "At least one test failed.  Differences between"
	echo "tests/expandTemplate.now.txt tests/expandTemplate.ref.txt:"
	echo "$RESULT"
	exit 1;
fi

