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
    everyScheduleJob: everyScheduleJob,
    getRewardText: getRewardText,
    getRecordText: getRecordText
};

async function confirmReward(client, msg) {
    if (!channelList.includes(msg.channel.id)) return;
    let count = await imgUtil.getNotDupeCountFromMsg(client, msg);
    if (count == 0 || count == NaN) return;

    client.Mdbcollection.updateOne({ type: 'check-msg', channelId: msg.channel.id }, { $push: { users: { $each: [msg.author.id] } } });

    if (msg.channel.id == channelList[0]) {
        let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();
        console.log(temp)
        let originCount = temp[0].msg[msg.member.id]
        originCount = (originCount == undefined || originCount == NaN) ? 0 : originCount / 2

        count = (count + originCount > 5) ? 5 : count + originCount;
        client.Mdbcollection.updateOne({ type: 'reward-ticket' }, { "$set": { [`msg.${msg.member.id}`]: `${2 * count}` } });
    }
    if (msg.channel.id == channelList[2] && await dbUtil.checkMsgNotInChannel(client, channelList[1], msg)) {

        // return msg.reply('今日尚未於 <#867811395474423838> 發文');
        client.channels.cache.get('964516826811858984').send('<@' + msg.member + '>今日尚未於 <#867811395474423838> 發文');

    }

}

async function giveReward(client) {
    var d = new Date();
    client.channels.cache.get('964516826811858984').send(`==========${d.getMonth() + 1}/${d.getDate()} 輔助獎勵區==========`);
    let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();

    new Map(Object.entries(temp[0].msg)).forEach((value, key) => {
        client.channels.cache.get('964516826811858984').send(`x!bot-ticket <@${key}> ${value}`);
    });

}

async function everyScheduleJob(client) {  //https://www.codexpedia.com/javascript/nodejs-cron-schedule-examples/

    // var rule1 = new schedule.RecurrenceRule();
    // rule1.minute = new schedule.Range(0, 59, 5);

    schedule.scheduleJob('50 59 15 * * *', async function () {
        const guildid = '829673608791851038';
        let guild = await client.guilds.cache.get(guildid);
        giveReward(client);
        getRewardText(client, guild);
        getRecordText(client, guild, ["記錄區", "867811395474423838"])
        getRecordText(client, guild, ["日常獎勵記錄區", "886269472158138429"])
        getRecordText(client, guild, ["佬專用紀錄區", "948120050458574878"])
    });


    schedule.scheduleJob('10 0 16 * * *', async function () {
        dbUtil.dbInitReward(client, null);
        dbUtil.dbInitCheckMsg(client, null);
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
    user_ids = new Array();

    m.forEach((value, key) => {
        //let user = await getUser(client, key);
        //console.log(user);
        //let userTag = `@${user.username}#${user.discriminator}`;
        let userTag = `<@${key}>`;
        //console.log(userTag);
        output.push(`x!ticket ${userTag} ${value}`);
    });

    console.log(output);
    const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), `${date.getMonth() + 1}-${date.getDate()}.txt`);
    client.channels.cache.get(sendChannel).send({ files: [attachment] });
    // client.channels.cache.get(sendChannel).send({ content: '```' + output.join('\n') + '```' });
}

async function getRecordText(client, guild, args) {
    let temp = await client.Mdbcollection.find({ type: "check-msg", channelId: args[1] }).toArray();
    let temp2 = temp[0].users.filter(function (elem, pos) {
        return temp[0].users.indexOf(elem) == pos;
    })
    var nowDate = new Date().getTime();
    nowDate += (8 * 60 * 60 * 1000);
    var date = new Date(nowDate)
    let output = [`==========${date.getMonth() + 1}/${date.getDate()} ${args[0]}==========\n`];

    await temp2.forEach(function getOutput(elem) {
        let userTag = `<@${elem}>`;
        output.push(`x!give ${userTag}`);
    });

    console.log(output);
    const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), `${date.getMonth() + 1}-${date.getDate()}.txt`);
    client.channels.cache.get(sendChannel).send({ files: [attachment] });
    // client.channels.cache.get(sendChannel).send({ content: '```' + output.join('\n') + '```' });
}
