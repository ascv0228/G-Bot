const { prefix } = require('../../config/config.json');

module.exports = {
    name: "envelope",
    aliases: ["pasred"],

    execute(client, msg, args) {
        if (!msg.content.startsWith(`x!`)) return;
        if (msg.content.startsWith(`x!envelope`) && args.length > 2) {
            client.channels.cache.get('964699991601995787').send(msg.url);
            client.channels.cache.get('964699991601995787').send("無口令");
            return;
        }
        if (msg.content.startsWith(`x!pasred`) && args.length > 3) {
            client.channels.cache.get('964699991601995787').send(msg.url);
            client.channels.cache.get('964699991601995787').send("口令:");
            client.channels.cache.get('964699991601995787').send(msg.content.split(' ').splice(3, 3, '').join(' '));
            return;
        }
    }
};
