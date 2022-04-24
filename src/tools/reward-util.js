const target_channel = require('../../config/channelId.json');
const imgUtil = require('./img-util.js');
const dbUtil = require('./db-util.js');
const schedule = require('node-schedule');

const channelList = [target_channel[0].channel_Id,
target_channel[1].channel_Id,
target_channel[2].channel_Id,
target_channel[3].channel_Id
]

module.exports.confirmReward = async function (client, msg) {
    if (!channelList.includes(msg.channel.id)) return;
    confirmReward(client, msg);
};

module.exports.everyScheduleJob = async function (client) {
    everyScheduleJob(client);
};

async function confirmReward(client, msg) {
    let count = await imgUtil.getNotDupeCountFromMsg(client, msg);
    //console.log(`count: ${count}`);
    if (count == 0) return;

    client.Mdbcollection.updateOne({ type: 'check-msg', channelId: msg.channel.id }, { $push: { users: { $each: [msg.author.id], $position: 0 } } });

    if (msg.channel.id == channelList[0]) {
        let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();
        console.log(temp)
        let originCount = temp[0].msg[msg.member.id]
        originCount = (originCount == undefined || originCount == NaN) ? 0 : originCount / 2

        console.log(`originCount: ${originCount}`)
        count = (count + originCount > 5) ? 5 : count + originCount;
        console.log(`count: ${count}`)
        client.Mdbcollection.updateOne({ type: 'reward-ticket' }, { "$set": { [`msg.${msg.member.id}`]: `${2 * count}` } });
    }
    if (msg.channel.id == channelList[2] && await dbUtil.checkMsgNotInChannel(channelList[1], msg.author.id) && count != 0) {

        // return msg.reply('今日尚未於 <#867811395474423838> 發文');
        client.channels.cache.get('964516826811858984').send('<@' + msg.member + '>今日尚未於 <#867811395474423838> 發文');

    }

}


async function giveReward(client) {
    var d = new Date();
    client.channels.cache.get('964516826811858984').send(`==========${d.getMonth() + 1}/${d.getDate()} 輔助獎勵區==========`);
    let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();
    await temp[0].msg.forEach((value, key) => {
        client.channels.cache.get('964516826811858984').send(`x!bot-ticket <@${key}> ${value}`)
    });

}


async function everyScheduleJob(client) {  //https://www.codexpedia.com/javascript/nodejs-cron-schedule-examples/

    // var rule1 = new schedule.RecurrenceRule();
    // rule1.minute = new schedule.Range(0, 59, 5);

    schedule.scheduleJob('10 0 16 * * *', async function () {
        giveReward(client);
        dbUtil.dbInitReward(client, null);
        dbUtil.dbInitCheckMsg(client, null);
    });
}
