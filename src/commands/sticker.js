const dcUtil = require('../tools/dc-util.js');
const Discord = require("discord.js")

module.exports = {
    name: "sticker",

    async execute(client, msg) {
        let msg1;
        if (msg.type === 'REPLY') {
            msg1 = await msg.fetchReference();
        }
        else return msg.reply("要回覆一則有'貼圖'(sticker)的訊息");
        // console.log(msg1)
        console.log(msg1.stickers)
        let member = msg.member;
        for (let [s, a] of msg1.stickers) {
            const avatarEmbed = new Discord.MessageEmbed()
                .setImage(getWeb_1(s))
                .setFooter({
                    text: member.user.tag,
                    iconURL: member.displayAvatarURL({ dynamic: true })
                });
            msg.channel.send({ embeds: [avatarEmbed] });
            const avatarEmbed2 = new Discord.MessageEmbed()
                .setImage(getWeb_2(s))
                .setFooter({
                    text: member.user.tag,
                    iconURL: member.displayAvatarURL({ dynamic: true })
                });
            msg.channel.send({ embeds: [avatarEmbed2] });
        }
        // console.log(await msg1.stickers.fetch())
    }
}

function getWeb_1(id) {
    return `https://media.discordapp.net/stickers/${id}.png?size=240`
}
function getWeb_2(id) {
    return `https://media.discordapp.net/stickers/${id}.png?size=240&passthrough=true`
}