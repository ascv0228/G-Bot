const target_channel = require('../../config/channelId.json');
const imgUtil = require('./img-util.js');
const dbUtil = require('./db-util.js');
const schedule = require('node-schedule');
const Discord = require('discord.js');

const channelList = [target_channel[0].channel_Id,
target_channel[1].channel_Id,
target_channel[2].channel_Id,
target_channel[3].channel_Id
]

module.exports = {
    confirmReward: confirmReward,
    everydayScheduleJob: everydayScheduleJob,
    getRewardText: getRewardText,
    getRecordText: getRecordText,
    giveReward: giveReward,
    giveEverydayPoint: giveEverydayPoint
};

async function confirmReward(client, msg) {
    // if (msg.channel.id == "863086136180342804")
    //     return imgUtil.getImageBase64(client, msg);
    if (!channelList.includes(msg.channel.id)) return;
    if (msg.channel.id == channelList[2] && await dbUtil.checkMsgNotInChannel(client, channelList[1], msg)) {
        let ImageArray = await getImageUrlArray(msg);
        if (ImageArray.length == 0) return;
        msg.reply(' 提醒 : <#867811395474423838> 有4000的紀錄才能來這邊貼發文');
        client.channels.cache.get('964516826811858984').send('<@' + msg.member + '>今日尚未於 <#867811395474423838> 發文');
        return;
    }
    let count = await imgUtil.getNotDupeCountFromMsg(client, msg);
    if (count == 0 || count == NaN) return;

    client.Mdbcollection.updateOne({ type: 'check-msg', channelId: msg.channel.id }, { $push: { users: { $each: [msg.author.id] } } });

    if (msg.channel.id == channelList[0]) {
        let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();
        let originCount = temp[0].msg[msg.member.id]
        originCount = (originCount == undefined || originCount == NaN) ? 0 : originCount / 2

        count = (count + originCount > 5) ? 5 : count + originCount;
        client.Mdbcollection.updateOne({ type: 'reward-ticket' }, { "$set": { [`msg.${msg.member.id}`]: `${2 * count}` } });
    }

}

async function giveReward(client) {
    var d = new Date();
    client.channels.cache.get('964516826811858984').send(`==========${d.getMonth() + 1}/${d.getDate()} 輔助獎勵區==========`);
    let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();

    new Map(Object.entries(temp[0].msg)).forEach((value, key) => {
        client.channels.cache.get('964516826811858984').send(`x!bot-award <@${key}> ${value * 100}`);
    });

}

async function giveEverydayPoint(client) {
    var d = new Date();
    client.channels.cache.get('964516826811858984').send(`==========${d.getMonth() + 1}/${d.getDate()} r每日任務完成區==========`);

    let temp = await client.Mdbcollection.find({ type: "check-msg", channelId: '886269472158138429' }).toArray();
    let user_ids = temp[0].users.filter(function (elem, pos) {
        return temp[0].users.indexOf(elem) == pos;
    })
    let members = await guild.members.fetch({ user: user_ids, withPresences: true })

    for (const [id, member] of members) {
        client.channels.cache.get('964516826811858984').send(`x!bot-point <@${id}> 2`);
    }
}

async function everydayScheduleJob(client) {  //https://www.codexpedia.com/javascript/nodejs-cron-schedule-examples/

    // var rule1 = new schedule.RecurrenceRule();
    // rule1.minute = new schedule.Range(0, 59, 5);

    schedule.scheduleJob('50 59 15 * * *', async function () {
        const guildid = '829673608791851038';
        let guild = await client.guilds.cache.get(guildid);
        giveReward(client);
        getRewardText(client, guild);
        getRecordText(client, guild, ["記錄區", "867811395474423838", "normal"])
        getRecordText(client, guild, ["日常獎勵記錄區", "886269472158138429", "daily"])
        getRecordText(client, guild, ["佬專用紀錄區", "948120050458574878", "big"])
    });


    schedule.scheduleJob('10 0 16 * * *', async function () {
        dbUtil.dbInitReward(client, null);
        dbUtil.dbInitCheckMsg(client, null);
        client.channels.cache.get('867811395474423838').send(`============截止線=============`);
        client.channels.cache.get('886269472158138429').send(`============截止線=============`);
        client.channels.cache.get('948120050458574878').send(`============截止線=============`);
        client.channels.cache.get('963831403001307167').send(`============截止線=============`);
    });
}

const sendChannel = '967986563260772352'

async function getRewardText(client, guild) {
    let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();
    //const fetchUser = async id => client.users.fetch(id);
    var nowDate = new Date().getTime();
    nowDate += (8 * 60 * 60 * 1000);
    var date = new Date(nowDate)
    let output = [`==========${date.getMonth() + 1}/${date.getDate()} 輔助獎勵區==========\n`];
    const m = new Map(Object.entries(temp[0].msg))
    let user_ids = new Array();
    let tickets = new Array();

    m.forEach((value, key) => {
        user_ids.push(key);
        tickets.push(value);
    });

    let members = await guild.members.fetch({ user: user_ids, withPresences: true })

    // let i = 0;
    // for (const [id, member] of members) {
    //     let userTag = `@${member.user.username}#${member.user.discriminator}`;
    //     ++i;
    // }

    let order_userTag = new Map();

    for (const [id, member] of members) {
        let userTag = `@${member.user.username}#${member.user.discriminator}`;
        order_userTag.set(id, userTag);
    }
    for (let i in user_ids) {
        // console.log(user_ids[i]);
        output.push(`x!ticket ${order_userTag.get(user_ids[i])} ${tickets[i]}`);
    }

    let file_name = `${date.getMonth() + 1}-${date.getDate()}(support).txt`
    const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), file_name);
    client.channels.cache.get(sendChannel).send({ files: [attachment] });
    client.channels.cache.get(sendChannel).send({ content: file_name + '```' + output.join('\n') + '```' });
}

async function getRecordText(client, guild, args) {
    let temp = await client.Mdbcollection.find({ type: "check-msg", channelId: args[1] }).toArray();
    let user_ids = temp[0].users.filter(function (elem, pos) {
        return temp[0].users.indexOf(elem) == pos;
    })
    var nowDate = new Date().getTime();
    nowDate += (8 * 60 * 60 * 1000);
    var date = new Date(nowDate)
    let output = [`==========${date.getMonth() + 1}/${date.getDate()} ${args[0]}==========\n`];

    let members = await guild.members.fetch({ user: user_ids, withPresences: true })
    let order_userTag = new Map();

    for (const [id, member] of members) {
        let userTag = `@${member.user.username}#${member.user.discriminator}`;
        order_userTag.set(id, userTag);
    }
    for (let user_id of user_ids) {
        // console.log(user_id);
        output.push(`x!award ${order_userTag.get(user_id)}`);
    }
    let file_name = `${date.getMonth() + 1}-${date.getDate()}(${args[2]}).txt`
    const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), file_name);
    client.channels.cache.get(sendChannel).send({ files: [attachment] });
    client.channels.cache.get(sendChannel).send({ content: file_name + '```' + output.join('\n') + '```' });
}

/*
var request = require('request')//.defaults({ encoding: null });
const crypto = require('crypto');
const sha256 = x => crypto.createHash('sha256').update(x).digest('base64');

const zlib = require('zlib');
async function getBase64FromImageUrl(url) {
    return new Promise(function (resolve, reject) {
        const gzip = zlib.createGzip();

        const data = [];

        request.get(url)
            .pipe(gzip)
            .on('data', (d) => {
                data.push(d);
            })
            .on('error', (e) => {
                reject(e);
            })
            .on('end', () => {
                resolve(Buffer.concat(data).toString("base64"));
            });
    });
}

async function getImageBase64(client, msg) {
    ImageArray = await imgUtil.getImageUrlArray(msg);
    for (let url of ImageArray) {
        let base64 = await getBase64FromImageUrl(url);
        let hash = sha256(base64)
        msg.reply(hash);
    }
    return 0;
}*/
/*
async function getHashFromImageUrl(url) {
    return new Promise(function (resolve, reject) {
        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                data = Buffer.from(body).toString('base64');
                let hash = sha256(data);
                resolve(hash);
            }
        });
    });
}*/