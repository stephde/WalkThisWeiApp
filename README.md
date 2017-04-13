# WalkThisWeiApp

Check out the [WalktThisWeiWebpage](https://stephde.github.io/WalkThisWeiApp/)

Also have a look at the waffle.io [IssueBoard](https://waffle.io/stephde/WalkThisWeiApp)


## General Prerequisites
- git
- Node
- npm
- any editor (e.g. Atom, IntelliJ)
- any terminal (e.g. iTerm)
- (for debugging install [react-native-debugger](https://github.com/jhen0409/react-native-debugger) on macOs `brew cask install react-native-debugger`)
- (on mac [homebrew](https://brew.sh/)) 


## General Installation
- `git clone https://github.com/stephde/WalkThisWeiApp.git`
- `cd WalkThisWeiApp`
- `npm install -g react-native-cli`
- `npm install`
- `react-native link`


## Set Up for IOS on MacOS
- install xcode
- run `brew update && brew cask install react-native-debugger` to install the debugger
- run `react-native link`
- run `react-native run-ios` in WalkThisWeiApp directory to start

if you get an error like 'FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)'
then run `brew install watchman`


## Set up for Android (MacOS and Windows)
- installation process is described in the [react-native docs](https://facebook.github.io/react-native/releases/0.23/docs/android-setup.html)
- install android sdk
- install android emulator (e.g. genymotion)
- set ANDROID_HOME environment variable to sdk location
- set sdk location in android emulator (e.g. genymotion)
- create an android device and start it
- run `react-native run-android` in WalkThisWeiApp directory to start

## Edit GitHub Webpage
Entrypoint for the github webpage (https://stephde.github.io/WalkThisWeiApp/)
is the docs directory. The index.html will be used as landing page.
All images are in the images subdirectory and styles are in CSS subdir

## Contribution Guidelines
- do not commit on master
- ideally work on your own feature branch
- create pull request in order to get code to production
- do not commit your node_modules directory
- test if your code works and does not break any other functionality BEFORE committing
- look for and manage tasks on the waffle.io board or in the github issues


## Open App on IPhone, Android-Phone
as described in the [react-native docs](https://facebook.github.io/react-native/docs/running-on-device.html)
