const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "guild-banner",

    async execute(client, interaction, args) {
        let msg = interaction.message;
        let member = interaction.member;

        let guild = await client.guilds.cache.get(args[0]);

        const bannerEmbed = new Discord.MessageEmbed()
            .setDescription(`${guild.name} 橫幅: `)
            .setImage(guild.bannerURL({ size: 4096, format: 'gif' }))
            .setFooter({
                text: member.user.tag,
                iconURL: member.displayAvatarURL({ dynamic: true })
            });
        msg.channel.send({ embeds: [bannerEmbed] });

        return;
    }
};
