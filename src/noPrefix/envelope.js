const { prefix } = require('../../config/config.json');

module.exports = {
    name: "envelope",
    aliases: ["pasred"],
    channels: ['990817755328573441', '964699991601995787'],

    async execute(client, msg) {
        if (!msg.content.startsWith(`x!`)) return;
        let [cmd, ...args] = msg.content.slice().trim().split(/\s+/);
        for (let chl of this.channels) {
            let channel = await client.channels.cache.get(chl)
            try {
                if (cmd == 'x!envelope' && args.length > 1) {
                    channel.send(msg.url);
                    channel.send("無口令");
                    continue;
                }
                if (cmd == 'x!pasred' && args.length > 2) {
                    channel.send(msg.url);
                    channel.send("口令:");
                    channel.send(msg.content.split(' ').splice(3, 3, '').join(' '));
                    continue;
                }
            }
            catch { }
        }
    }
};
