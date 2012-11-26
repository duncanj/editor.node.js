#!/bin/bash
PIDFILE=/var/tmp/editor.node.js-master-server.pid

if [ -f $PIDFILE ]
then
    # kill process
    kill `cat $PIDFILE`
fi

rm $PIDFILE

EXPR="node server.js &"
eval $EXPR
PID=$!

echo $PID > $PIDFILE
