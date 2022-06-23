
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const { DiscordBanners } = require('discord-banners');

module.exports = {
    name: "avatar",
    aliases: ["avt"],
    guilds: [],

    async execute(client, msg, args) {
        let member = await dcUtil.getMemberByTag(msg.guild, args[0]) || msg.member;
        let opts = [
            {
                label: '使用者頭像',
                value: `g!avatar <@${member.id}> ${msg.author.id}`,
            }
        ]
        if (member.avatar)
            opts.push({
                label: '伺服器頭像',
                value: `g!memberavatar <@${member.id}> ${msg.author.id}`,
            })
        if (await checkHasBanner(client, member.user.id))
            opts.push({
                label: '橫幅',
                value: `g!banner <@${member.id}> ${msg.author.id}`,
            })
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

async function checkHasBanner(client, userId) {

    const discordBanners = new DiscordBanners(client);
    try {
        const banner = await discordBanners.getBanner(userId, { size: 2048, format: "png", dynamic: true });
        if (!banner.includes('http')) return null;
        return banner;
    }
    catch {
        return null;
    }
}

function getMyTag(id) {
    return `<@${id}>`
}