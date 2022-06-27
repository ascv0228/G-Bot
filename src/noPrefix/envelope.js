const { prefix } = require('../../config/config.json');

module.exports = {
    name: "envelope",
    aliases: ["pasred"],
    channels: ['990817755328573441', '964699991601995787'],

    execute(client, msg) {
        if (!msg.content.startsWith(`x!`)) return;
        let args = msg.content.slice('x!ban '.length).trim().split(/\s+/);
        for (let chl of this.channels) {
            try {
                if (msg.content.startsWith(`x!envelope`) && args.length > 2) {
                    client.channels.cache.get(chl).send(msg.url);
                    client.channels.cache.get(chl).send("無口令");
                    continue;
                }
                if (msg.content.startsWith(`x!pasred`) && args.length > 3) {
                    client.channels.cache.get(chl).send(msg.url);
                    client.channels.cache.get(chl).send("口令:");
                    client.channels.cache.get(chl).send(msg.content.split(' ').splice(3, 3, '').join(' '));
                    continue;
                }
            }
            catch { }
        }
    }
};
