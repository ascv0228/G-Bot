
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
        let guild = await dcUtil.getGuildByID(client, args[0]) || msg.guild;

        let opts = new Array();
        if (guild.icon)
            opts.push({
                label: '伺服器頭像',
                value: `g!guild-icon ${guild.id} ${msg.author.id}`,
            })
        if (guild.banner)
            opts.push({
                label: '伺服器橫幅',
                value: `g!guild-banner ${guild.id} ${msg.author.id}`,
            })
        if (guild.splash)
            opts.push({
                label: '伺服器邀請連結背景',
                value: `g!guild-splash ${guild.id} ${msg.author.id}`,
            })
        opts.push({
            label: '伺服器邀請連結',
            value: `g!guild-invite ${guild.id} ${msg.author.id}`,
        })
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('請選擇伺服器頭像/橫幅/邀請連結背景/邀請連結')
                    .addOptions(opts),
            );

        await msg.channel.send({ components: [row] });
    }
};
