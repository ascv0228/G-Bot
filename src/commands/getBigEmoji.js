const dcUtil = require('../tools/dc-util.js');
module.exports = {
    name: "getBigEmoji",
    aliases: ['gbe'],

    async execute(client, msg, args) {
        let emoji_id = dcUtil.matchEmoji(args)
        if (!emoji_id) return;
        msg.reply({ content: `${emoji_url_png(emoji_id)}` });
        msg.reply({ content: `${emoji_url_gif(emoji_id)}` });
    }
}


function emoji_url_png(id) {
    return `https://cdn.discordapp.com/emojis/${id}.png?size=4096&quality=lossless`
}

function emoji_url_gif(id) {
    return `https://cdn.discordapp.com/emojis/${id}.png?size=4096&quality=lossless`
}