const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { imageHash } = require('image-hash');
const { token } = require('../config/token.json');
const { prefix } = require('../config/config.json');
const fs = require('fs');
const target_channel = require('../config/channelId.json');
const hashDataJson = require('../hashData.json');
const { send } = require('process');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

/*
function getPing(msg) {
    msg.channel.send(`Ping is ${Date.now() - msg.createdTimestamp}ms. API Ping is ${Math.round(client.ws.ping)}ms`);
}*/