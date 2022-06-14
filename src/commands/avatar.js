
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "avatar",
    aliases: ["avt"],
    guilds: [],

    async execute(client, msg, args) {
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
        if (member.user.banner) {
            opts.push({
                label: '橫幅',
                value: `g!banner ${args[0] ? args[0] : ''}`,
            })
        }
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