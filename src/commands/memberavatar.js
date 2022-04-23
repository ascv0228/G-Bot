const Discord = require('discord.js');

module.exports = {
    name: "memberavatar",
    aliases: ["memavt"],

    execute(client, msg, args) {
        let user = msg.mentions.members.first() || msg.member;
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
