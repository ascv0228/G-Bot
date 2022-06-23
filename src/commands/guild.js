
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const { DiscordBanners } = require('discord-banners');

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
        let opts = [
            {
                label: '伺服器頭像',
                value: `g!guild-icon <@${member.id}> ${msg.author.id}`,
            }
        ]
        if (guild.banner)
            opts.push({
                label: '伺服器橫幅',
                value: `g!guild-banner <@${member.id}> ${msg.author.id}`,
            })
        /*
    if (await checkHasBanner(client, member.user.id))
        opts.push({
            label: '伺服器邀請連結背景',
            value: `g!guild-invite-background <@${member.id}> ${msg.author.id}`,
        })
    if (await checkHasBanner(client, member.user.id))
        opts.push({
            label: '伺服器邀請連結',
            value: `g!guild-invite <@${member.id}> ${msg.author.id}`,
        })*/
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('請選擇頭像來源/橫幅')
                    .addOptions(opts),
            );

        await msg.channel.send({ components: [row] });
    }
};