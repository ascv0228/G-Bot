
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "avatar",
    aliases: ["avt"],
    guilds: [],

    async execute(client, msg, args) {
        const discordBanners = new DiscordBanners(client);
        let member = await dcUtil.getMemberByTag(msg.guild, args[0]) || msg.member;
        let opts = [
            {
                label: '使用者頭像',
                value: `g!avatar ${args[0] ? args[0] : ''} ${msg.author.id}`,
            }
        ]
        if (member.avatar)
            opts.push({
                label: '伺服器頭像',
                value: `g!memberavatar ${args[0] ? args[0] : ''} ${msg.author.id}`,
            })
        if (checkHasBanner(discordBanners, member.user.id))
            opts.push({
                label: '橫幅',
                value: `g!banner ${args[0] ? args[0] : ''} ${msg.author.id}`,
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

async function checkHasBanner(discordBanners, userId) {
    return new Promise(function (resolve, reject) {
        const banner = await discordBanners.getBanner(userId, { size: 2048, format: "png", dynamic: true })
            .on('error', (e) => {
                reject(null);
            })
            .on('end', () => {
                resolve(banner);
            });
    });
}