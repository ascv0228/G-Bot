const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "avatar",
    aliases: ["avt"],

    async execute(client, msg, args) {
        let user = await dcUtil.getUserByTag(msg.guild, args[0])
        user = user || msg.author;
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