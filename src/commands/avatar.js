
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "avatar",
    aliases: ["avt"],
    guilds: [],

    async execute(client, msg, args) {

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('請選擇頭像來源/橫幅')
                    .addOptions([
                        {
                            label: '使用者頭像',
                            value: `g!avatar ${args[0] ? args[0] : ''} ${msg.author.id}`,
                        },
                        {
                            label: '伺服器頭像',
                            value: `g!memberavatar ${args[0] ? args[0] : ''} ${msg.author.id}`,
                        },/*
                        {
                            label: '橫幅',
                            value: `g!banner ${args[0] ? args[0] : ''}`,
                        },*/
                    ]),
            );

        await msg.channel.send({ components: [row] });
    }
};