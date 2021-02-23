# Firebase App Distribution Github Action

This action uploads artifacts (.apk or .ipa) to Firebase App Distribution.

## Inputs

### `appId`

**Required** App id can be found on the General Settings page

### `serviceCredentialsFile`

**Required** Service Credentials File - The path to your [service account](https://firebase.google.com/docs/app-distribution/android/distribute-gradle#authenticate_using_a_service_account) private key JSON file.

### `file`

**Required** Artifact to upload (.apk or .ipa)

### `groups`

Distribution groups

### `releaseNotes`

Release notes visible on release page. If not specified, plugin will add last commit's
- hash
- author
- message

## Sample usage

```
name: Build & upload to Firebase App Distribution 

on: [push]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - name: set up JDK 1.8
      uses: actions/setup-java@v1
      with:
        java-version: 1.8
    - name: build release 
      run: ./gradlew assembleRelease
    - name: upload artifact to Firebase App Distribution
      uses: darius-sv/Firebase-Distribution-Github-Action@v1
      with:
        appId: ${{secrets.FIREBASE_APP_ID}}
        serviceCredentials: ${{secrets.SERVICE_ACCOUNT}}
        groups: testers
        file: app/build/outputs/apk/release/app-release-unsigned.apk
```