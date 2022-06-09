const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "memberavatar",
    aliases: ["memavt"],

    async execute(client, msg, args) {
        let user = await dcUtil.getMemberByTag(msg.guild, args[0]) || msg.member;
        console.log(user)
        const avatarEmbed = new Discord.MessageEmbed()
            .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
            .setFooter({
                text: msg.author.tag,
                iconURL: msg.member.displayAvatarURL({ dynamic: true })
            });
        msg.channel.send({ embeds: [avatarEmbed] });
        return;
    }
};
