# SmartOverlay Release Signing

Release APK updates require:

1. Same applicationId
2. Same signing key
3. Same key alias
4. Higher versionCode
5. Valid release signature

Example:

Version 1:
versionCode = 1
versionName = "1.0.0"

Next update:
versionCode = 2
versionName = "1.1.0"

Users can install the new APK over the existing installation when
the signing key and applicationId remain unchanged.
