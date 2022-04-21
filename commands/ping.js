// const Discord = require('discord.js');
// const { Client, Intents } = require('discord.js');
// const { imageHash } = require('image-hash');
// const mongoose = require('mongoose');
// const schedule = require('node-schedule');
// const { token, database } = require('./config/token.json');
// const { prefix } = require('./config/config.json');
// const fs = require('fs');
// const target_channel = require('./config/channelId.json');
// // const hashDataJson = require('./hashData.json');
// const { send } = require('process');
// /*
// const { getVideoID } = require('ytdl-core');
// const ytdl = require('ytdl-core');
// const ytpl = require('ytpl');*/
// //const base_command = require('./bot/base-command.js');
// const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = {
    name: "ping",
    // channels: ["xxxx", "xxxxx"],

    async execute(client, msg, args) {
        const resMsg = await msg.channel.send({ content: 'Ping...' });
        await resMsg.edit({ content: `Ping: ${resMsg.createdTimestamp - msg.createdTimestamp}ms | Websocket: ${client.ws.ping}ms` });
    }
};