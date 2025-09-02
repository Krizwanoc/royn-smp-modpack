#!/bin/bash

read -p "enter in the version number (ROYNSMP_vx.y.z-wwwwwww): " ver
zip -r "ROYNSMP_CLIENT_$ver.zip" mods/ addons/ config/ tacz/ options.txt resourcepacks/ kubejs/assets/ kubejs/client_scripts/ kubejs/config/ kubejs/data/ kubejs/server_scripts/ kubejs/startup_scripts/

# delete probejs since its only used for development
zip -d "ROYNSMP_CLIENT_$ver.zip" mods/probejs-6.0.1-forge.jar

cp "ROYNSMP_CLIENT_$ver.zip" "ROYNSMP_SERVER_$ver.zip"

# delete server-only mods on the client
serverOnly=("spark-1.10.53-forge" "Chunky-1.3.146")
for som in "${serverOnly[@]}"; do
    zip -d "ROYNSMP_CLIENT_$ver.zip" mods/$som.jar
done

# delete client-only mods on the server
clientOnly=("cloth-config-11.1.136-forge" "configured-forge-1.20.1-2.2.3" "MouseTweaks-forge-mc1.20.1-2.25.1" "REIPluginCompatibilities-forge-12.0.93" "RoughlyEnoughItems-12.1.785-forge" "journeymap-1.20.1-5.10.3-forge")
for com in "${clientOnly[@]}"; do
    zip -d "ROYNSMP_SERVER_$ver.zip" mods/$com.jar
done