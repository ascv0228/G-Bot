const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "banner",
    // aliases: ["avt"],

    async execute(client, msg, args) {
        let member = await dcUtil.getMemberByTag(msg.guild, args[0]) || msg.member;
        console.log(member)
        // if (!member.user.banner)
        //     msg.reply("no user banner");
        // else {
        const avatarEmbed = new Discord.MessageEmbed()
            .setImage(member.user.bannerURL())
            .setFooter({
                text: msg.author.tag,
                iconURL: msg.member.displayAvatarURL({ dynamic: true })
            });
        msg.channel.send({ embeds: [avatarEmbed] });
        // }
        /*
        if (!member.banner)
            msg.reply("no member banner");
        else {
            avatarEmbed.setImage(`https://cdn.discordapp.com/banners/${member.Id}/${member.banner}?size=512`);
            msg.channel.send({ embeds: [avatarEmbed] });
        }
        return;*/
    }
};

async function getUserBannerUrl(userId) {
    const user = await client.api.users(userId).get();
    return user.banner ? `https://cdn.discordapp.com/banners/${userId}/${user.banner}?size=512` : null;
}