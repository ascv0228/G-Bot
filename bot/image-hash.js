const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { token } = require('./config/token.json');
const { prefix } = require('./config/config.json');
const fs = require('fs');
const target_channel = require('./config/channelId.json');
const hashDataJson = require('./hashData.json');
const { send } = require('process');
const base_command = require('./bot/base-command.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


function IsImage(url) {
    const subFiles = [".png", ".jpg", ".jpeg", ".webp"]

    for (let i = 0; i < subFiles.length; ++i) {
        let index = url.indexOf(subFiles[i], 40);
        if (index == -1) continue;
        return true
    }
    return false;
}
function getImageUrlArray(msg) {
    let ImageUrlArray = new Array();
    msg.attachments.forEach(attachment => {
        const ImageUrl = attachment.proxyURL;
        if (IsImage(ImageUrl)) {
            ImageUrlArray.push(ImageUrl)
        }
    });
    return ImageUrlArray;
}

function getHashDataFromUrl(url) {
    if (!IsImage(url)) return 0;
    return new Promise((resolve, reject) => {
        imageHash(url, 16, true, (error, data) => {
            if (error) throw error;
            resolve(data);
        });
    });
}
