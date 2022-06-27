const { prefix } = require('../../config/config.json');

module.exports = {
    name: "envelope",
    aliases: ["pasred"],
    channels: ['990817755328573441', '964699991601995787'],

    async execute(client, msg) {
        if (!msg.content.startsWith(`x!`)) return;
        console.log(msg.content)
        let [cmd, ...args] = msg.content.slice().trim().split(/\s+/);
        console.log(cmd)
        console.log(args)
        for (let chl of this.channels) {
            let channel = await client.channels.cache.get(chl)
            try {
                if (msg.content.startsWith(`x!envelope`) && args.length > 1) {
                    channel.send(msg.url);
                    channel.send("無口令");
                    continue;
                }
                if (msg.content.startsWith(`x!pasred`) && args.length > 2) {
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
