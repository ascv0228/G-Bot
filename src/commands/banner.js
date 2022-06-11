const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "banner",
    // aliases: ["avt"],

    async execute(client, msg, args) {
        let user = await dcUtil.getMemberByTag(msg.guild, args[0]) || msg.author;
        if (!user.user.banner)
            msg.reply("no user banner");
        else {
            const avatarEmbed = new Discord.MessageEmbed()
                .setImage(`https://cdn.discordapp.com/banners/${user.user.Id}/${user.user.banner}?size=512`)
                .setFooter({
                    text: msg.author.tag,
                    iconURL: msg.member.displayAvatarURL({ dynamic: true })
                });
            msg.channel.send({ embeds: [avatarEmbed] });
        }

        if (!user.banner)
            msg.reply("no member banner");
        else {
            avatarEmbed.setImage(`https://cdn.discordapp.com/banners/${user.Id}/${user.banner}?size=512`);
            msg.channel.send({ embeds: [avatarEmbed] });
        }
        return;
    }
};

async function getUserBannerUrl(userId) {
    const user = await client.api.users(userId).get();
    return user.banner ? `https://cdn.discordapp.com/banners/${userId}/${user.banner}?size=512` : null;
}