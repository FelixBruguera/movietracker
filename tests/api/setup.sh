#!/bin/bash

export ENVIROMENT="TEST" && \
npm run dev & 

npx wait-on http://localhost:3000
vitest 'tests/api'
kill -9 $(pgrep -f '^next-server')

unset ENVIROMENT