
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const { DiscordBanners } = require('discord-banners');
const Discord = require('discord.js');
module.exports = {
    name: "guild",
    aliases: ["server"],
    guilds: [],

    // 1. icon
    // 2. banner
    // 3. 邀請連結
    // 4. 邀請連結背景


    async execute(client, msg, args) {
        // let member = await dcUtil.getMemberByTag(msg.guild, args[0]) || msg.member;
        let guild = msg.guild;
        const iconEmbed = new Discord.MessageEmbed()
            .setDescription(`${guild.name} 頭貼: `)
            .setImage(guild.iconURL({ size: 4096, dynamic: true }))
            .setFooter({
                text: msg.member.user.tag,
                iconURL: msg.member.displayAvatarURL({ dynamic: true })
            });
        console.log(guild.iconURL({ extension: 'png', size: 4096 }))
        msg.channel.send({ embeds: [iconEmbed] });
        // let opts = [
        //     {
        //         label: '伺服器頭像',
        //         value: `g!guild-icon <@${guild.id}> ${msg.author.id}`,
        //     }
        // ]
        // if (guild.banner)
        //     opts.push({
        //         label: '伺服器橫幅',
        //         value: `g!guild-banner <@${guild.id}> ${msg.author.id}`,
        //     })
        // /*
        // if (await checkHasBanner(client, member.user.id))
        //     opts.push({
        //         label: '伺服器邀請連結背景',
        //         value: `g!guild-invite-background <@${guild.id}> ${msg.author.id}`,
        //     })
        // if (await checkHasBanner(client, member.user.id))
        //     opts.push({
        //         label: '伺服器邀請連結',
        //         value: `g!guild-invite <@${guild.id}> ${msg.author.id}`,
        // })*/
        // const row = new MessageActionRow()
        //     .addComponents(
        //         new MessageSelectMenu()
        //             .setCustomId('select')
        //             .setPlaceholder('請選擇伺服器頭像/橫幅/邀請連結')
        //             .addOptions(opts),
        //     );

        // await msg.channel.send({ components: [row] });
    }
};