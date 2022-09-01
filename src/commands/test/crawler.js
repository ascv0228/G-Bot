// const { prefix } = require('../../config/config.json');
// const { token } = require('../../config/token.json');
// const Discord = require('discord.js');
// const dcUtil = require('../tools/dc-util.js');
// const dbUtil = require('../tools/db-util.js');
// const rewardUtil = require('../tools/reward-util.js');
// const { Permissions } = require('discord.js');
// const scheduleUtil = require('../tools/schedule-util.js');
// const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
// module.exports = {
//     name: "crawler",
//     permissions: ['Administrator'],

//     async execute(client, msg, args) {
//         if (msg.author.id !== '411895879935590411') return;
//         if (!args || args.length < 3)
//             return msg.reply(`g!${this.name} <channelID> <after-msg-id> <before-msg-id>`)
//         let channel = await client.channels.fetch(args[0])
//         let after = args[1];
//         let before = args[2];
//         let messages = await channel.messages.fetch({ before: before, after: after, force: true })
//         console.log(messages.size)
//         for (let [msg_id, message] of messages) {
//             // console.log(message.author)
//             console.log(`@${message.author.username}#${message.author.discriminator}`)
//         }

//     }
// }