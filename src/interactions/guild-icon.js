const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "guild-icon",

    async execute(client, interaction, args) {
        let msg = interaction.message;
        let member = interaction.member;

        let guild = await client.guilds.cache.get(args[0]);
        const iconEmbed = new Discord.MessageEmbed()
            .setDescription(`${guild.name} 頭貼: `)
            .setImage(guild.iconURL({ size: 4096, dynamic: true }))
            .setFooter({
                text: member.user.tag,
                iconURL: member.displayAvatarURL({ dynamic: true })
            });
        msg.channel.send({ embeds: [iconEmbed] });

        return;
    }
};