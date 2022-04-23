const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { imageHash } = require('image-hash');
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const { token, database } = require('./config/token.json');
const { prefix } = require('./config/config.json');
const fs = require('fs');
const path = require("path")
const target_channel = require('./config/channelId.json');
const { send } = require('process');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

process.on('uncaughtException', (err, origin) => {
    console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
});

/*
* 1.  獎勵 0:00 再發
* 2.  檢查 有記錄區 才能丟 每日
* 3.  分批清空資料庫指令
* 4.  img-hash bug
* 5.  分檔
*/
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.musicDict = new Map();
function loadCommands() {
    const dirPath = `./src/commands`;
    //const dirPath = [`./src/commands`, `./src/music`];

    return readDirAll(dirPath, (file) => {
        if (file.match(/(\.js|\.ts)$/)) {
            const command = require(file);
            if (command.aliases) {
                command.aliases.forEach(alias => {
                    this.aliases.set(alias, command);
                });
            }

            if (command.name) {
                if (command.listens && command.listens.length > 0) {
                    this.listens.set(command.name, command);
                } else {
                    this.commands.set(command.name, command);
                }
            }
        }
    });
}

client.loadCommands = loadCommands;

function readDirAll(dir, fileHandler, dirHandler) {
    let dirents = fs.readdirSync(dir, { withFileTypes: true });
    /*
    for (let i = 1; i < dirs.length; ++i) {
        dirents.concat(fs.readdirSync(dirs[i], { withFileTypes: true }));
    }*/

    return Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);

        if (dirent.isDirectory()) {
            if (dirHandler) {
                dirHandler(res);
            }

            return readDirAll(res, fileHandler, dirHandler);
        } else {
            if (fileHandler) {
                fileHandler(res);
            }

            return res;
        }
    }));
}



client.on('ready', () => {
    client.user.setActivity(`GG的大GG`, { type: "PLAYING" });
    console.log(`Logged in as ${client.user.tag}!`);

    loadMongodb();
    everyScheduleJob();

    //const dirPath = [`./src/commands`, `./src/music`];
    client.loadCommands();
    client.loadCommands();
});

async function loadMongodb() {
    if (!database) return;
    mongoose.Promise = global.Promise;
    mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("The client is now connected to the database!")
    }).catch((err) => {
        console.log(err)
    });
    let db = mongoose.connection;;
    client.Mdbcollection = db.collection('Clients');
}

async function everyScheduleJob() {  //https://www.codexpedia.com/javascript/nodejs-cron-schedule-examples/

    // var rule1 = new schedule.RecurrenceRule();
    // rule1.minute = new schedule.Range(0, 59, 5);

    schedule.scheduleJob('10 0 16 * * *', async function () {
        giveReward(client);

    });
}

async function giveReward(client) {
    var d = new Date();
    client.channels.cache.get('964516826811858984').send(`==========${d.getMonth() + 1}/${d.getDate()} 輔助獎勵區==========`);
    let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();
    await temp[0].msg.forEach((value, key) => {
        client.channels.cache.get('964516826811858984').send(`x!bot-ticket <@${key}> ${value}`)
    });

    dbInitReward(client, null);
    dbInitCheckMsg(client, null);
}

async function dbInitReward(client, args) {
    await client.Mdbcollection.deleteMany({ type: 'reward-ticket' })
    client.Mdbcollection.insertOne({ type: 'reward-ticket', msg: new Map() });
}

async function dbInitCheckMsg(client, args) {
    await client.Mdbcollection.deleteMany({ type: 'check-msg' })
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '963831403001307167', users: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '867811395474423838', users: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '886269472158138429', users: new Array() });
    client.Mdbcollection.insertOne({ type: 'check-msg', channelId: '948120050458574878', users: new Array() });
}



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
        msg.channel.id == target_channel[3].channel_Id) {
        confirmReward(msg);
        return;
    }

    if (msg.member.roles.cache.has('863405200562454548') && msg.author.id == '411895879935590411') {
        console.log('GG')
    }
    const lines = msg.content.trim().split("\n");
    for (let i = 0; i < lines.length; ++i) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        const [cmd, ...args] = lines[i].slice(prefix.length).trimEnd().split(/\s+/);
        const exec = client.commands.get(cmd) || client.aliases.get(cmd);
        if (!exec) continue;
        exec.execute(client, msg, args);
    }


});


async function AdminFunction(msg) {
    if (msg.content.startsWith(`${prefix}getday`)) {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        //msg.channel.send(`${d.getHours()}、${d}`)
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


async function confirmReward(msg) {
    let ImageUrlArray = getImageUrlArray(msg)
    let count = 0
    for (let i = 0; i < ImageUrlArray.length; ++i) {
        const hash = await getHashDataFromUrl(ImageUrlArray[i]);
        if (hash == '0') continue;
        if (hash == 'error') {
            count++;
            continue;
        }
        let flag = await insertHashToDatabase(msg, hash)
        if (flag) {
            count++;
        }
    }
    if (msg.channel.id == target_channel[0].channel_Id) {
        if (count != 0) {
            let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();
            let originCount = temp[0].msg[msg.member.id]
            originCount = (originCount == undefined) ? 0 : originCount / 2

            count = (count + originCount > 5) ? 5 : count + originCount;
            // client.channels.cache.get('964516826811858984').send(`x!bot-ticket  ${msg.member} ${2 * count}`);{ "$set": { [`hash.${hashData}`]: urlEncode(msg.url) } }
            client.Mdbcollection.updateOne({ type: 'reward-ticket' }, { "$set": { [`msg.${msg.member.id}`]: `${2 * count}` } });
        }
        return;
    }
    if (msg.channel.id == target_channel[2].channel_Id && checkMsgNotInChannel(msg.channel.id, msg.author.id && count != 0)) {

        // return msg.reply('今日尚未於 <#867811395474423838> 發文');
        console.log(count)
        client.channels.cache.get('964516826811858984').send('<@' + msg.member + '>今日尚未於 <#867811395474423838> 發文');

    }
    client.Mdbcollection.updateOne({ type: 'check-msg', channelId: msg.channel.id }, { $push: { users: { $each: [msg.author.id], $position: 0 } } });

}


async function checkMsgNotInChannel(channel_id, author_id) {
    let temp = await client.Mdbcollection.find({ type: 'check-msg', channelId: channel_id }).toArray()
    return !temp.includes(author_id);
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
    if (!IsImage(url)) return '0';
    return new Promise((resolve, reject) => {
        //url = cutImageUrl(url);
        imageHash(url, 16, true, (error, data) => {
            if (error) {
                resolve('error');
            }
            resolve(data);
        })
    });
}


async function insertHashToDatabase(msg, hashData) {
    let channelId = msg.channel.id
    let guildId = msg.guild.id
    let flag = await checkNotInDatabase(channelId, hashData)
    if (flag == undefined) {
        client.Mdbcollection.updateOne({ type: 'hashData', channelId: channelId }, { "$set": { [`hash.${hashData}`]: urlEncode(msg.url) } });
        return flag;
    } else {
        client.channels.cache.get('964516826811858984').send('<@' + msg.member + '>' + ' use same image! in <#' + channelId + '> , ' + msg.url + '\n'
            + 'origin url in: ' + decodeUrl(flag, guildId, channelId));
        return (flag != undefined);
    }
}

function urlEncode(url) {
    return url.substring(85 - 18, 85);
}

function decodeUrl(encodeUrl, guildID, channelID) {
    return 'https://discord.com/channels/' + `${guildID}` + `/${channelID}/` + encodeUrl;
}

async function checkNotInDatabase(channelId, hashData) {
    temp = await client.Mdbcollection.find({ type: 'hashData', channelId: channelId }).toArray();
    return temp[0].hash[hashData]
}

client.login(token);
