const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const { DiscordBanners } = require('discord-banners');

module.exports = {
    name: "banner",
    // aliases: ["avt"],


    async execute(client, interaction, args) {
        const discordBanners = new DiscordBanners(client);
        let msg = interaction.message;
        let member = interaction.member;

        let user = await dcUtil.getMemberByTag(msg.guild, args[0]) || msg.member;
        const banner = await discordBanners.getBanner(user.user.id, { size: 2048, format: "png", dynamic: true })
        if (banner) {
            const avatarEmbed = new Discord.MessageEmbed()
                .setImage(banner)
                .setFooter({
                    text: member.user.tag,
                    iconURL: member.displayAvatarURL({ dynamic: true })
                });
            return msg.channel.send({ embeds: [avatarEmbed] })
        }
        else if (!banner) return msg.channel.send("User banner not found!")

    }
};