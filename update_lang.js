const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'jitsi-cfg/web/lang/main.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function replaceInObject(obj) {
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].replace(/Jitsi Meet/g, 'Eway Meet');
            obj[key] = obj[key].replace(/Jitsi/g, 'Eway');
        } else if (typeof obj[key] === 'object') {
            replaceInObject(obj[key]);
        }
    }
}

replaceInObject(data);

// Ensure overrides
if (!data.welcomepage) data.welcomepage = {};
data.welcomepage.headerTitle = 'Eway Meet';
data.welcomepage.headerSubtitle = 'Connect and collaborate';
data.welcomepage.appDescription = 'Go ahead, video chat with the whole team. In fact, invite everyone you know. Eway Meet is a fully encrypted, 100% open source video conferencing solution that you can use all day, every day, for free — with no account needed.';

fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
