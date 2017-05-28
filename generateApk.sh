#!/usr/bin/env bash

# get bundle from packager
curl "http://localhost:8081/index.android.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"

# go to android folder and assemble
cd android
./gradlew assembleRelease

# generate keystore
# uncomment this line if you are generating the apk for the first time
# keytool -genkey -v -keystore my-keystore.keystore -alias walkThisWei -keyalg RSA -validity 10000

# sign package
# --> requires keystore
jarsigner -verbose -keystore my-keystore.keystore app/build/outputs/apk/app-release-unsigned.apk walkThisWei