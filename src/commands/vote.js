const dcUtil = require('../tools/dc-util.js');
const Discord = require('discord.js');

module.exports = {
    name: "vote",

    async execute(client, msg, args) {
        let emoji_id = dcUtil.matchEmoji(args[0])
        if (!emoji_id) return;
        msg.reply({ content: `${emoji_url_png(emoji_id)}` });
        msg.reply({ content: `${emoji_url_gif(emoji_id)}` });
    }
}
