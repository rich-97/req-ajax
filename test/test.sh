#!/usr/bin/env bash

if ! webpack --version &> /dev/null; then
  echo 'Webpack is not installed.'
else
  echo 'Test webpack...'

  webpack \
  --entry './test/test-webpack.js' \
  --output-filename 'bundle.js' \
  --output-path './test' &> /dev/null
fi

if [ $? != 0 ]; then
  echo 'Error test req-ajax with webpack.'
else
  echo 'Please see the file test/bundle.js.'
fi

echo 'Test req-ajax with your browser...'

nodejs './test/test-server.js'
