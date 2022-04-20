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
});
function everyScheduleJob() {
    schedule.scheduleJob('30 0 * * * *', function () {
        client.channels.cache.get('964516826811858984').send('每小時輸出文字測試');
        //client.channels.cache.get('964516826811858984').send(`x!bot-ticket  ${content}`);
    });
}

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
        msg.channel.id == target_channel[3].channel_Id/* ||
        msg.channel.id == target_channel[4].channel_Id*/) {
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
    }
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

    } else if (msg.content.startsWith(`${prefix}dbInit confirm`) && msg.author.id == '411895879935590411') {
        msg.reply('DataBase已清空!')
        dbInit();
    } else if (msg.content.startsWith(`${prefix}getall`) && msg.author.id == '411895879935590411') {
        let temp = await collection.find({}).toArray();
        console.log(temp)
        msg.reply('Finish!')
    }
}

async function baseFunction(msg) {
    if (msg.content == `${prefix}ping`) {
        getPing(msg);
    }
}

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
    if (msg.channel.id == target_channel[0].channel_Id) {
        let count = (ImageUrlArray.length > 5) ? 5 : ImageUrlArray.length;
        console.log('count: ' + count)
        for (let i = 0; i < count; ++i) {
            const hash = await getHashDataFromUrl(ImageUrlArray[i]);
            if (!await insertHashToDatabase(msg, hash)) {
                count--;
                console.log('count decrease')
            }
        }
        if (count != 0) client.channels.cache.get('964516826811858984').send(`x!bot-ticket  ${msg.member} ${2 * count}`);
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
            resolve(data);
        });
    });
}

async function getPing(msg) {
    const resMsg = await msg.channel.send({ content: 'Ping...' });
    await resMsg.edit({ content: `Ping: ${resMsg.createdTimestamp - msg.createdTimestamp}ms | Websocket: ${client.ws.ping}ms` });
}

async function insertHashToDatabase(msg, hashData) {
    let channelId = msg.channel.id
    let flag = await checkNotInDatabase(channelId, hashData)
    console.log('flag2: ' + flag)
    if (flag) {
        collection.updateOne({ type: 'hashData', channelId: channelId }, { $push: { hash: { $each: [hashData], $position: 0 } } });
        return flag;
    } else {
        client.channels.cache.get('964516826811858984').send('<@' + msg.member + '>' + ' use same image! in <#' + channelId + '> , ' + msg.url);
        return flag;
    }
}

async function checkNotInDatabase(channelId, hashData) {
    let flag = false;
    let temp;
    temp = await collection.find({ type: 'hashData', channelId: channelId }).toArray();
    console.log(temp)
    flag = !temp[0].hash.includes(hashData)
    console.log('flag: ' + flag)
    return flag
}

function dbInit() {
    collection.drop()
    collection.insertOne({ type: 'hashData', channelId: '963831403001307167', hash: new Array() });
    collection.insertOne({ type: 'hashData', channelId: '867811395474423838', hash: new Array() });
    collection.insertOne({ type: 'hashData', channelId: '886269472158138429', hash: new Array() });
    collection.insertOne({ type: 'hashData', channelId: '948120050458574878', hash: new Array() });
    collection.insertOne({ type: 'hashData', channelId: '863086136180342804', hash: new Array() });
    collection.insertOne({ type: 'reward-ticket', msg: new Array() });
    collection.insertOne({ type: 'check-msg', channelId: '963831403001307167', hash: new Array() });
    collection.insertOne({ type: 'check-msg', channelId: '867811395474423838', hash: new Array() });
    collection.insertOne({ type: 'check-msg', channelId: '886269472158138429', hash: new Array() });
    collection.insertOne({ type: 'check-msg', channelId: '948120050458574878', hash: new Array() });
    collection.insertOne({ type: 'check-msg', channelId: '863086136180342804', hash: new Array() });
}
client.login(token);
