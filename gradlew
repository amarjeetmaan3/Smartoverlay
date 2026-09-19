#!/bin/sh

APP_HOME="$(cd "$(dirname "$0")" && pwd)"

echo "SmartOverlay Gradle launcher"
echo "Use Android Studio or a generated Gradle wrapper to build this project."

exec gradle "$@"
