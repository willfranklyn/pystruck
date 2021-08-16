#! /bin/sh

echo ~~ installing bash ~~

apk update
apk upgrade
apk add bash
apk add --no-cache python3 py3-pip

bash --version
python3 --version