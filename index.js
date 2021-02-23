const core = require('@actions/core');
const firebase = require('firebase-tools');
const { spawnSync } = require('child_process');
const fs = require('fs');
const serviceAccountFile = '/tmp/service-account-key.json';

async function main() {
    try {
        fs.writeFile(serviceAccountFile, core.getInput('serviceCredentials'));
        process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountFile;

        const releaseNotes = core.getInput('releaseNotes') ||
                             spawnSync('git', ['log', '-1', '--pretty=short']).output.join('').toString();

        await firebase.appdistribution.distribute(core.getInput('file'), {
            app: core.getInput('appId'), //'1:729594068203:ios:7486b1866af069d9',
            releaseNotes: releaseNotes,
            groups: core.getInput('groups'), // 'ios-softvision'
        });
    } catch (e) {
        core.setFailed(e.message);
    }

    if (fs.existsSync(serviceAccountFile)) {
        fs.unlinkSync(serviceAccountFile);
    }
}

main();

