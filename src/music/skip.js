const { prefix } = require('../../config/config.json');

module.exports = {
    name: "ping",
    // channels: ["xxxx", "xxxxx"],

    async execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        if (client.dispatcher !== undefined) client.dispatcher.end();
    }
};