#!/bin/bash

export ENVIROMENT="TEST" && \
vercel dev & 

SERVER_PID=$!
npx wait-on http://localhost:3000
vitest
kill $SERVER_PID

unset ENVIROMENT