#!/bin/bash

export ENVIROMENT="TEST" && \
npm run dev & 

npx wait-on http://localhost:3000
npx playwright test --ui
kill -9 $(pgrep -f '^next-server')
unset ENVIROMENT