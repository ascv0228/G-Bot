const { prefix } = require('../../config/config.json');

module.exports = {
    name: "version",

    execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        return msg.reply("分檔中...");
    }
};
