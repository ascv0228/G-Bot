const { prefix } = require('../../config/config.json');

module.exports = {
    name: "version",

    execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        let temp = ["分檔中...",
            "play、playnext重複"]
        msg.reply({ content: temp.join("\n") });
        return
    }
};
