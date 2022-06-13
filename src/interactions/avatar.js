const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "avatar",

    async execute(client, interaction, args) {
        let msg = interaction.message;
        let member = interaction.member;

        let user = await dcUtil.getUserByTag(msg.guild, args[0]) || member.user;
        const avatarEmbed = new Discord.MessageEmbed()
            .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
            .setFooter({
                text: member.user.tag,
                iconURL: member.displayAvatarURL({ dynamic: true })
            });
        msg.channel.send({ embeds: [avatarEmbed] });

        return;
    }
};