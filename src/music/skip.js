const { prefix } = require('../../config/config.json');

module.exports = {
    name: "skip",
    // channels: ["xxxx", "xxxxx"],

    async execute(client, msg, args) {
        if (client.dispatcher !== undefined) client.dispatcher.end();
    }
};