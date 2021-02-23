const core = require('@actions/core');
const firebase = require('firebase-tools');
const { spawnSync } = require('child_process');
const fs = require('fs');
const serviceAccountFile = '/tmp/service-account-key.json';

async function main() {
    try {
        fs.writeFileSync(serviceAccountFile, core.getInput('serviceCredentials'));
        process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountFile;

        const releaseNotes = core.getInput('releaseNotes') ||
                             spawnSync('git', ['log', '-1', '--pretty=short']).output.join('').toString();

        await firebase.appdistribution.distribute(core.getInput('file'), {
            app: core.getInput('appId'),
            releaseNotes: releaseNotes,
            groups: core.getInput('groups'),
        });
    } catch (e) {
        core.setFailed(e.message);
    }

    if (fs.existsSync(serviceAccountFile)) {
        fs.unlinkSync(serviceAccountFile);
    }
}

main();

