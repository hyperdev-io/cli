#!/bin/bash

pkg --out-path ./build ./src/cli.js
mv ./build/cli-linux ./build/bigboat-linux
mv ./build/cli-macos ./build/bigboat-mac
mv ./build/cli-win.exe ./build/bigboat.exe