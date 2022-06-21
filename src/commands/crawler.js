const { prefix } = require('../../config/config.json');
const { token } = require('../../config/token.json');
const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const dbUtil = require('../tools/db-util.js');
const RewardUtil = require('../tools/reward-util.js');
const { Permissions } = require('discord.js');
const scheduleUtil = require('../tools/schedule-util.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: "crawler",
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        if (!args || args.length < 3)
            return msg.reply(`g!${this.name} <channelID> <before-msg-id> <after-msg-id>`)
        let channel = await client.channels.fetch(args[0])
        let before = args[1];
        let after = args[2];
        let messages = await channel.messages.fetch({ before: before, after: after })
        for (let [msg_id, message] of messages) {
            // console.log(message.author)
            console.log(`@${message.author.username}#${message.author.discriminator}`)
        }

    }
}