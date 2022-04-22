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
/*
const { getVideoID } = require('ytdl-core');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');*/
//const base_command = require('./bot/base-command.js');
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
client.aliases = new Discord.Collection()
function loadCommands() {
    // const dirPath = `./commands`;
    const dirPath = `./src/commands`;

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
    const dirents = fs.readdirSync(dir, { withFileTypes: true });

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


mongoose.Promise = global.Promise;
let db = mongoose.connection;;
let collection = db.collection('Clients');;
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
    everyScheduleJob()
    client.loadCommands();
});

async function everyScheduleJob() {  //https://www.codexpedia.com/javascript/nodejs-cron-schedule-examples/

    // var rule1 = new schedule.RecurrenceRule();
    // rule1.minute = new schedule.Range(0, 59, 5);

    schedule.scheduleJob('10 0 16 * * *', async function () {

        var d = new Date();
        client.channels.cache.get('964516826811858984').send(`==========${d.getMonth() + 1}/${d.getDate()} 輔助獎勵區==========`);
        temp = await collection.find({ type: 'reward-ticket' }).toArray();
        for (let i of temp[0].msg) {
            client.channels.cache.get('964516826811858984').send(`x!bot-ticket ${i}`)
        }
        await collection.remove({ type: 'reward-ticket' })
        collection.insertOne({ type: 'reward-ticket', msg: new Array() });
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
    /*
        if (msg.content.startsWith(`x!envelope`) ||
            msg.content.startsWith(`x!pasred`)) {
            redEnvelope(msg)
            return;
        }*/
    if (msg.channel.id == target_channel[0].channel_Id ||
        msg.channel.id == target_channel[1].channel_Id ||
        msg.channel.id == target_channel[2].channel_Id ||
        msg.channel.id == target_channel[3].channel_Id) {
        confirmReward(msg);
        return;
    }
    const [cmd, ...args] = msg.content.slice(prefix.length).trimEnd().split(/\s+/);

    const exec = client.commands.get(cmd) || client.aliases.get(cmd);

    if (!exec) {
        msg.reply("被return 了");
        return;
    }
    exec.execute(client, msg, args);

    /*
        const exec2 = client.aliases.get(cmd);
    
        if (!exec2) return;
        exec2.execute(client, msg, args);*/

    // if (exec.channels && exec.channels.length > 0 && exec.channels.includes(msg.channel.id)) return;

    /*
        if (msg.channel.id == target_channel[0].channel_Id ||
            msg.channel.id == target_channel[1].channel_Id ||
            msg.channel.id == target_channel[2].channel_Id ||
            msg.channel.id == target_channel[3].channel_Id) {
            //confirmReward(msg);
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

async function AdminFunction(msg) {
    if (msg.content.startsWith(`${prefix}hash`)) {
        const url = msg.content.split(' ').splice(1).join(' ');
        if (!url.startsWith("http")) return;
        const hash = await getHashDataFromUrl();
        msg.channel.send('`' + hash + '`');
    } else if (msg.content.startsWith(`${prefix}dbInit confirm`) && msg.author.id == '411895879935590411') {
        msg.reply('DataBase已清空!')
        dbInit();
    } else if (msg.content.startsWith(`${prefix}getall`) && msg.author.id == '411895879935590411') {
        let temp = await collection.find({}).toArray();
        console.log(temp)
        msg.reply('Finish!')
    } else if (msg.content.startsWith(`${prefix}getday`)) {
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
    if (msg.channel.id == target_channel[0].channel_Id) {
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
        if (count != 0) {
            // client.channels.cache.get('964516826811858984').send(`x!bot-ticket  ${msg.member} ${2 * count}`);
            collection.updateOne({ type: 'reward-ticket' }, { $push: { msg: { $each: [`${msg.member} ${2 * count}`], $position: 0 } } });
        }
        return;
    }
    if (msg.channel.id == target_channel[1].channel_Id ||
        msg.channel.id == target_channel[2].channel_Id) {
        collection.updateOne({ type: 'check-msg', channelId: msg.channel.id }, { $push: { users: { $each: [msg.author.id], $position: 0 } } });
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
    let flag = await checkNotInDatabase(channelId, hashData)
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
    flag = !temp[0].hash.includes(hashData)
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
    collection.insertOne({ type: 'check-msg', channelId: '963831403001307167', users: new Array() });
    collection.insertOne({ type: 'check-msg', channelId: '867811395474423838', users: new Array() });
    collection.insertOne({ type: 'check-msg', channelId: '886269472158138429', users: new Array() });
    collection.insertOne({ type: 'check-msg', channelId: '948120050458574878', users: new Array() });
    collection.insertOne({ type: 'check-msg', channelId: '863086136180342804', users: new Array() });
}
client.login(token);
