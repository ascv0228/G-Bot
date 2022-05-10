const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "avatar",
    aliases: ["avt"],

    execute(client, msg, args) {
        let user = dcUtil.getUserByTag(msg.guild, args[0]) || msg.author;
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