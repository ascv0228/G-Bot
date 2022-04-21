const { prefix } = require('../../config/config.json');

module.exports = {
    name: "version",

    execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        msg.reply("ZZ 我的aliases不能用， getall有BUG")
        return;
    }
};
