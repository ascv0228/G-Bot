#!/bin/sh

java -Xmx128m -jar ./resource/service/Server.jar &

sleep 10

cd ./built
npm run js & cd ..

wait