const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { imageHash } = require('image-hash');
const mongoose = require('mongoose');
const { token, database } = require('./config/token.json');
const { prefix } = require('./config/config.json');
const fs = require('fs');
const target_channel = require('./config/channelId.json');
// const hashDataJson = require('./hashData.json');
const { send } = require('process');
/*
const { getVideoID } = require('ytdl-core');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');*/
//const base_command = require('./bot/base-command.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
/*client.commands = new Discord.Collections();
const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"))*/

process.on('uncaughtException', (err, origin) => {
    console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
});
var db;
var collection;
client.on('ready', () => {
    client.user.setActivity(`GG的大GG`, { type: "PLAYING" });
    console.log(`Logged in as ${client.user.tag}!`);
    if (!database) return;
    mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("The client is now connected to the database!")
    }).catch((err) => {
        console.log(err)
    });
    mongoose.Promise = global.Promise;
    db = mongoose.connection;
    collection = db.collection('Clients');
    dbInit();
});

client.on('messageCreate', msg => {
    try {
        if (!msg.guild || !msg.member) return;
        if (!msg.member.user) return;
        if (msg.member.user.bot) return;
    } catch (err) {
        return;
    }
    if (msg.content.startsWith(`x!envelope`) ||
        msg.content.startsWith(`x!pasred`)) {
        redEnvelope(msg)
    }
    if (msg.channel.id == target_channel[0].channel_Id ||
        msg.channel.id == target_channel[1].channel_Id ||
        msg.channel.id == target_channel[2].channel_Id ||
        msg.channel.id == target_channel[3].channel_Id ||
        msg.channel.id == target_channel[4].channel_Id) {
        confirmReward(msg);
    }
    if ((msg.member.permissions.has('ADMINISTRATOR') ||
        msg.author.id == "942746613263245312") &&
        msg.content.startsWith(`${prefix}`)) {
        if (msg.content == `${prefix}help` ||
            msg.content == `${prefix}h`) {
            AdminHelp(msg);
        }
        else {
            AdminFunction(msg);
            baseFunction(msg);

        }
    } else if (msg.content.startsWith(`${prefix}`)) {
        if (msg.content == `${prefix}help` ||
            msg.content == `${prefix}h`) {
            BaseHelp(msg);
        }
        baseFunction(msg);
    }/*
    if (msg.author.id == "942746613263245312" && !msg.content.startsWith(`${prefix}`)) {
        cuteFunction(msg);
    }
    if (msg.author.id == "411895879935590411" && !msg.content.startsWith(`${prefix}`)) {
        MyFunction(msg);
    }*/
});
function redEnvelope(msg) {
    if (msg.content.startsWith(`x!envelope`)) {
        client.channels.cache.get('964699991601995787').send(msg.url);
        client.channels.cache.get('964699991601995787').send("無口令");
        return;
    }
    client.channels.cache.get('964699991601995787').send(msg.url);
    client.channels.cache.get('964699991601995787').send("口令:");

    client.channels.cache.get('964699991601995787').send(msg.content.split(' ').splice(3, 3, '').join(' '));

}
function AdminHelp(msg) {
    contentArray = [
        '`' + 'avatar, avt' + '`' + " : 查看頭像",
        '`' + 'memberavatar, memavt' + '`' + " : 查看伺服器頭像",
        '`' + 'ping' + '`' + " : 顯示延遲"
    ]
    msg.reply({ content: contentArray.join("\n") });
}
function BaseHelp(msg) {
    contentArray = [
        '`' + 'ping' + '`' + " : 顯示延遲"
    ]
    msg.reply({ content: contentArray.join("\n") });
}
async function AdminFunction(msg) {
    if (msg.content.startsWith(`${prefix}hash`)) {
        const url = msg.content.split(' ').splice(1).join(' ');
        if (!url.startsWith("http")) return;
        const hash = await getHashDataFromUrl();
        msg.channel.send('`' + hash + '`');
    }
    else if (msg.content.startsWith(`${prefix}avatar`) ||
        msg.content.startsWith(`${prefix}avt`)) {
        getAvatar(msg);

    }
    else if (msg.content.startsWith(`${prefix}memberavatar`) ||
        msg.content.startsWith(`${prefix}memavt`)) {
        getMemberAvatar(msg);

    }
    else if (msg.content.startsWith(`${prefix}version`)) {
        msg.reply("v-temp")

    }/*
    else if (msg.content.startsWith(`${prefix}save`)) {
        const JsonStr = JSON.stringify(hashDataJson);
        fs.writeFile('./hashData.json', JsonStr, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });

    }*/
    // 
    // else if (msg.content == `${prefix}test` && msg.author.id == '411895879935590411') {
    // client.users.fetch('411895879935590411', false).then((user) => {
    // user.send('hello world');
    // let person = client.members.cache.get('942746613263245312');
    // /*const avatarEmbed = new Discord.MessageEmbed()
    // .setImage(person.displayAvatarURL({ size: 4096, dynamic: true }))
    // .setFooter({
    // text: msg.author.tag,
    // iconURL: msg.member.displayAvatarURL({ dynamic: true })
    // });*/
    // user.send(person.displayAvatarURL({ size: 4096, dynamic: true }));
    // });
    // }
}
async function baseFunction(msg) {
    if (msg.content == `${prefix}ping`) {
        getPing(msg);
    }
}
/*
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
    if (msg.content.includes("愛你")) {
        msg.reply("寶貝，我只愛你");
    }
    if (msg.guild.id == '964526913861341254') {
        if (msg.content.includes("GG") ||
            msg.content.includes("Gg") ||
            msg.content.includes("gG") ||
            msg.content.includes("gg") ||
            msg.content.includes("寶寶")) {
            msg.reply("<@411895879935590411> 有寶貝在找你");
        }
        return;
    }
    if (msg.guild.id == '829673608791851038' &&
        msg.content.includes("寶寶")) {
        msg.reply("<@411895879935590411> 有寶貝在找你");
    }
}*/
/*
function MyFunction(msg) {
    if (msg.content.includes("愛你")) {
        msg.channel.send("寶貝，我只愛你");
    }
}*/

function cutImageUrl(url) {
    const subFiles = [".png", ".jpg", ".jpeg", ".webp"]

    for (let i = 0; i < subFiles.length; ++i) {
        let index = url.indexOf(subFiles[i], 40);
        if (index == -1) continue;
        //return 1;
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
async function confirmReward(msg) {
    let ImageUrlArray = getImageUrlArray(msg)
    let count = ImageUrlArray.length;
    for (let i = 0; i < ImageUrlArray.length; ++i) {
        const hash = await getHashDataFromUrl(ImageUrlArray[i]);
        if (!insertHashToDatabase(msg, hash)) {
            count -= 1;
        }
        // client.channels.cache.get('863086136180342804').send('`' + hash + '`')
    }
    if (msg.channel.id == target_channel[0] || msg.channel.id == target_channel[4]) {
        client.channels.cache.get('964516826811858984').send(`x!bot-ticket  <@${msg.member}> ${2 * count}`)
        return;
    }

}
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
        //url = cutImageUrl(url);
        imageHash(url, 16, true, (error, data) => {
            if (error) throw error;
            //hashDataJson.push({ "url": url, "hash": data });
            resolve(data);
        });
    });
}

function getPing(msg) {
    msg.channel.send(`Ping is ${Date.now() - msg.createdTimestamp}ms. API Ping is ${Math.round(client.ws.ping)}ms`);
}

async function insertHashToDatabase(msg, hashData) {
    let channelId = msg.channel.id
    if (checkNotInDatabase(channelId, hashData)) {
        collection[channelId].push[hashData];
        return true;
    }
    client.channels.cache.get('863086136180342804').send('<@' + msg.member + '>' + ' use same image! in <#' + channelId + '> , ' + msg.url);
    return false;
}

function checkNotInDatabase(channelId, hashData) {
    let flag;
    if (channelId == '963831403001307167')
        flag = (collection.count({ '963831403001307167': { $eq: hashData } }) == 0)
    else if (channelId == '867811395474423838')
        flag = (collection.count({ '867811395474423838': { $eq: hashData } }) == 0)
    else if (channelId == '886269472158138429')
        flag = (collection.count({ '886269472158138429': { $eq: hashData } }) == 0)
    else if (channelId == '948120050458574878')
        flag = (collection.count({ '948120050458574878': { $eq: hashData } }) == 0)
    else if (channelId == '863086136180342804') {
        flag = collection.count({ '863086136180342804': { $eq: hashData } })
        console.log('num : ' + collection.find({ '863086136180342804': { $eq: hashData } }))
        flag = (flag == 0)
    }


    return flag
}

function dbInit() {
    collection.drop()
    collection.insertOne({ '963831403001307167': new Array() });
    collection.insertOne({ '867811395474423838': new Array() });
    collection.insertOne({ '886269472158138429': new Array() });
    collection.insertOne({ '948120050458574878': new Array() });
    collection.insertOne({ '863086136180342804': new Array() });
}
client.login(token);
