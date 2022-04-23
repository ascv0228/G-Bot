const { prefix } = require('../../config/config.json');

module.exports = {
    name: "ping",
    // channels: ["xxxx", "xxxxx"],

    async execute(client, msg, args) {
        if (client.dispatcher !== undefined) client.dispatcher.end();
    }
};