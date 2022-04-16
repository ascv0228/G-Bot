const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { imageHash } = require('image-hash');
const { token } = require('./config/token.json');
const { prefix } = require('./config/config.json');
const fs = require('fs');
const target_channel = require('./config/channelId.json');
const hashDataJson = require('./hashData.json');
const { send } = require('process');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

process.on('uncaughtException', (err, origin) => {
    console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
    try {
        if (!msg.guild || !msg.member) return;
        if (!msg.member.user) return;
        if (msg.member.user.bot) return;
    } catch (err) {
        return;
    }
    if (msg.channel.id == target_channel[0].channel_Id ||
        msg.channel.id == target_channel[1].channel_Id ||
        msg.channel.id == target_channel[2].channel_Id ||
        msg.channel.id == target_channel[3].channel_Id ||
        msg.channel.id == target_channel[4].channel_Id) {
        confirmReward(msg);
    }
    if ((msg.member.hasPermission('ADMINISTRATOR') ||
        msg.author.id == "942746613263245312") &&
        msg.content.startsWith(`${prefix}`)) {
        AdminHelp(msg);
        AdminFunction(msg);
        baseFunction(msg);
    } else if (msg.content.startsWith(`${prefix}`)) {
        baseFunction(msg);
    }
    if (msg.author.id == "942746613263245312" && !msg.content.startsWith(`${prefix}`)) {
        cuteFunction(msg);
    }
});

async function AdminFunction(msg) {
    if (msg.content.startsWith(`${prefix}hash`)) {
        const hash = await getHashDataFromUrl("https://cdn.discordapp.com/attachments/931060208095076352/964461581817761892/unknown.png");
    }
    else if (msg.content.startsWith(`${prefix}avatar`) ||
        msg.content.startsWith(`${prefix}avt`)) {
        getAvatar(msg);

    }
    else if (msg.content.startsWith(`${prefix}memberavatar`) ||
        msg.content.startsWith(`${prefix}memavt`)) {
        getMemberAvatar(msg);

    }
    else if (msg.content.startsWith(`${prefix}save`)) {
        const JsonStr = JSON.stringify(hashDataJson);
        fs.writeFile('./hashData.json', JsonStr, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });

    } else if (msg.content == `${prefix}test`) {
        client.channels.cache.get('id')
    }
}

async function baseFunction(msg) {
    if (msg.content == `${prefix}ping`) {
        getPing(msg);
    }

}

function cuteFunction(msg) {
    if (msg.content.includes("早安")) {
        msg.reply("小可愛早安~~");
    }
    if (msg.content.includes("晚安")) {
        msg.reply("晚安晚安早點休息~");
    }
    if (msg.content.includes("午安")) {
        msg.reply("要記得吃午餐唷~");
    }
}

function getPing(msg) {
    msg.channel.send(`Ping is ${Date.now() - msg.createdTimestamp}ms. API Ping is ${Math.round(client.ws.ping)}ms`);
}

function cutImageUrl(url) {
    const subFiles = [".png", ".jpg", ".jpeg", ".webp"]

    for (let i = 0; i < subFiles.length; ++i) {
        let index = url.indexOf(subFiles[i], 60);
        if (index == -1) continue;
        return url.slice(0, (index += (i < 2) ? 4 : 5))
    }
    return 0;
}

function getAvatar(msg) {
    let user = msg.mentions.users.first() || msg.author;
    const avatarEmbed = new Discord.MessageEmbed()
        .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
        .setFooter({
            text: msg.author.tag,
            iconURL: msg.member.displayAvatarURL({ dynamic: true })
        });
    msg.channel.send({ embeds: [avatarEmbed] });
}
function getMemberAvatar(msg) {
    let user = msg.mentions.members.first() || msg.member;
    const avatarEmbed = new Discord.MessageEmbed()
        .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
        .setFooter({
            text: msg.author.tag,
            iconURL: msg.member.displayAvatarURL({ dynamic: true })
        });
    msg.channel.send({ embeds: [avatarEmbed] });
}
function getAvatar(msg) {
    let user = msg.mentions.users.first() || msg.author;
    const avatarEmbed = new Discord.MessageEmbed()
        .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
        .setFooter({
            text: msg.author.tag,
            iconURL: msg.member.displayAvatarURL({ dynamic: true })
        });
    msg.channel.send({ embeds: [avatarEmbed] });
}

async function confirmReward(msg) {
    let ImageUrlArray = getImageUrlArray(msg)
    for (let i = 0; i < ImageUrlArray.length; ++i) {
        const hash = await getHashDataFromUrl(ImageUrlArray[i]);
        msg.channel.send('`' + hash + '`')
    }
}

function getImageUrlArray(msg) {
    let ImageUrlArray = new Array();
    msg.attachments.forEach(attachment => {
        const ImageUrl = attachment.proxyURL;
        if (cutImageUrl(ImageUrl) != 0) {
            ImageUrlArray.push(ImageUrl)
            msg.channel.send('`' + ImageUrl + '`')
        }
    });
    return ImageUrlArray;
}

function getHashDataFromUrl(url) {
    return new Promise((resolve, reject) => {
        url = cutImageUrl(url);
        let hashCode;
        imageHash(url, 16, true, (error, data) => {
            if (error) throw error;
            hashCode = `${data}`;
            hashDataJson.push({ "url": url, "hash": data });
            resolve(hashCode);
        });
    });
}





client.login(token);
