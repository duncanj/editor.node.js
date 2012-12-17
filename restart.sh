#!/bin/bash
PIDFILE=/var/tmp/editor.node.js-master-server.pid
LOGFILE=/var/tmp/editor.node.js-master-server.log

if [ -f $PIDFILE ]
then
    # kill process
    kill `cat $PIDFILE`
fi

rm $PIDFILE

EXPR="sudo node server.js >> $LOGFILE 2>&1 &"
eval $EXPR
PID=$!

echo $PID > $PIDFILE
