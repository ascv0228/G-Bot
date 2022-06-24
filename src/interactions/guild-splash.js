const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "guild-splash",

    async execute(client, interaction, args) {
        let msg = interaction.message;
        let member = interaction.member;

        let guild = await client.guilds.cache.get(args[0]);
        const iconEmbed = new Discord.MessageEmbed()
            .setDescription(`${guild.name} 邀請連結背景: `)
            .setImage(getSplashUrl(guild.id, guild.splash))
            .setFooter({
                text: member.user.tag,
                iconURL: member.displayAvatarURL({ dynamic: true })
            });
        msg.channel.send({ embeds: [iconEmbed] });

        return;
    }
};

function getSplashUrl(guildId, splashHash) {
    return `https://cdn.discordapp.com/splashes/${guildId}/${splashHash}.jpg?size=4096`
}