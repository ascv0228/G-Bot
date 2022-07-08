const target_channel = require('../../config/channelId.json');
const imgUtil = require('./img-util.js');
const dbUtil = require('./db-util.js');
const dcUtil = require('./dc-util.js');
const schedule = require('node-schedule');
const Discord = require('discord.js');

const channelList = [target_channel[0].channel_Id,
target_channel[1].channel_Id,
target_channel[2].channel_Id,
target_channel[3].channel_Id
]

module.exports = {
    confirmReward: confirmReward,
    // everydayScheduleJob: everydayScheduleJob,
    getRewardText: getRewardText,
    getRecordText: getRecordText,
    giveReward: giveReward,
    giveBigReward: giveBigReward,
    giveEverydayPoint: giveEverydayPoint,
    give4000Reward: give4000Reward
};

async function confirmReward(client, msg) {
    // if (msg.channel.id == "863086136180342804")
    //     return imgUtil.getImageBase64(client, msg);
    if (!channelList.includes(msg.channel.id)) return;
    /*
    if (msg.channel.id == channelList[2] && await dbUtil.checkMsgNotInChannel(client, channelList[1], msg)) {
        let ImageArray = await imgUtil.getImageUrlArray(msg);
        if (ImageArray.length == 0) return;
        msg.reply(' 提醒 : <#867811395474423838> 有4000的紀錄才能來這邊貼發文');
        client.channels.cache.get('964516826811858984').send('<@' + msg.member + '>今日尚未於 <#867811395474423838> 發文');
        return;
    }*/
    let count = await imgUtil.getNotDupeCountFromMsg(client, msg);
    if (count == 0 || count == NaN) return;

    client.Mdbcollection.updateOne({ type: 'check-msg', channelId: msg.channel.id }, { $push: { users: { $each: [msg.author.id] } } });
    msg.react('844246188492193812')
    if (msg.channel.id == channelList[1]) { // 4000
        let reward = get4000Reward(msg)
        client.Mdbcollection.updateOne({ type: 'reward-4000-ticket' }, { "$set": { [`msg.${msg.member.id}`]: `${reward}` } });
    }
    if (msg.channel.id == channelList[0]) {
        let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();
        let originCount = temp[0].msg[msg.member.id]
        originCount = (originCount == undefined || originCount == NaN) ? 0 : originCount / 2

        count = (count + originCount > 5) ? 5 : count + originCount;
        client.Mdbcollection.updateOne({ type: 'reward-ticket' }, { "$set": { [`msg.${msg.member.id}`]: `${2 * count}` } });
    }
    if (msg.channel.id == channelList[3]) {
        let temp = await client.Mdbcollection.find({ type: 'reward-big-ticket' }).toArray();
        let originCount = temp[0].msg[msg.member.id]
        originCount = (originCount == undefined || originCount == NaN) ? 0 : originCount / 3

        count = (count + originCount > 5) ? 5 : count + originCount;
        client.Mdbcollection.updateOne({ type: 'reward-big-ticket' }, { "$set": { [`msg.${msg.member.id}`]: `${3 * count}` } });
    }

}

async function giveReward(client) {
    var d = new Date();
    let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();
    channel = await client.channels.fetch('964516826811858984')
    channel.send(`==========${d.getMonth() + 1}/${d.getDate()} 輔助獎勵區==========`);
    new Map(Object.entries(temp[0].msg)).forEach((value, key) => {
        channel.send(`x!bot-ticket <@${key}> ${value}`);
    });
}

async function giveBigReward(client) {
    var d = new Date();
    let temp = await client.Mdbcollection.find({ type: 'reward-big-ticket' }).toArray();
    channel = await client.channels.fetch('964516826811858984')
    channel.send(`==========${d.getMonth() + 1}/${d.getDate()} 佬獎勵區==========`);
    new Map(Object.entries(temp[0].msg)).forEach((value, key) => {
        channel.send(`x!bot-ticket <@${key}> ${value}`);
    });
}

async function give4000Reward(client) {
    var d = new Date();
    let temp = await client.Mdbcollection.find({ type: 'reward-4000-ticket' }).toArray();
    channel = await client.channels.fetch('964516826811858984')
    channel.send(`==========${d.getMonth() + 1}/${d.getDate()} 4000紀錄區獎勵==========`);
    new Map(Object.entries(temp[0].msg)).forEach((value, key) => {
        channel.send(`x!test-award <@${key}> ${value}`);
    });
}

async function giveEverydayPoint(client, guild) {
    var d = new Date();

    let texts = [['886269472158138429', '每日任務完成區', '2000']]
    for (let [channel_Id, text, awards] of texts) {
        let output_text = new Array();
        output_text.push('```');
        let temp = await client.Mdbcollection.find({ type: "check-msg", channelId: channel_Id }).toArray();
        let user_ids = temp[0].users.filter(function (elem, pos) {
            return temp[0].users.indexOf(elem) == pos;
        })
        let members = await guild.members.fetch({ user: user_ids, withPresences: true })
        let output_channel_1 = await client.channels.cache.get('964516826811858984'); // gbot-log
        let output_channel_2 = await client.channels.cache.get('967986563260772352'); // gbot-草稿
        output_channel_1.send(`==========${d.getMonth() + 1}/${d.getDate()} ${text}==========`);
        for (const [id, member] of members) {
            output_channel_1.send(`x!bot-award <@${id}> ${awards}`);
            output_text.push();
        }
        output_text.push('```');
        output_channel_2.send(output_text.join('\n'));
    }
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

async function getRecordText(client, guild, args, prefix_suffix) {
    // var nowDate = new Date().getTime();
    // nowDate += (8 * 60 * 60 * 1000);
    var date = new Date(new Date() + (8 * 60 * 60 * 1000))
    let output_prefix = [`==========${date.getMonth() + 1}/${date.getDate()} ${args[0]}==========\n`];
    let output = await getRecordOutputArray(client, guild, args, prefix_suffix);
    let file_name = `${date.getMonth() + 1}-${date.getDate()}(${args[2]}).txt`
    const attachment = new Discord.MessageAttachment(Buffer.from((output_prefix.concat(output)).join('\n')), file_name);
    client.channels.cache.get(sendChannel).send({ files: [attachment] });
    for (let i = 0; i < output.length / 75; ++i) {
        client.channels.cache.get(sendChannel).send({ content: file_name + '```' + (output_prefix.concat(output.slice(i * 75, (i + 1) * 75 - 1))).join('\n') + '```' });
    }
    // client.channels.cache.get(sendChannel).send({ content: file_name + '```' + (output_prefix.concat(output)).join('\n') + '```' });
}


async function getRecordOutputArray(client, guild, args, prefix_suffix) {
    let temp = await client.Mdbcollection.find({ type: "check-msg", channelId: args[1] }).toArray();
    let user_ids = temp[0].users.filter(function (elem, pos) {
        return temp[0].users.indexOf(elem) == pos;
    })
    // console.log(user_ids);
    let output = new Array();
    // let members = await guild.members.fetch({ user: user_ids, withPresences: true })
    let members = await guild.members.fetch({ force: true })
    let order_userTag = new Map();
    for (const [id, member] of members) {
        let userTag = `@${member.user.username}#${member.user.discriminator}`;
        // console.log(userTag)
        order_userTag.set(id, userTag);
    }
    for (let prefix of prefix_suffix[0]) {
        for (let user_id of user_ids) {
            // console.log(`${prefix} ${order_userTag.get(user_id)} ${prefix_suffix[1]}`);
            output.push(`${prefix} ${order_userTag.get(user_id)} ${prefix_suffix[1]}`);
        }
    }
    // console.log(output)
    return output
}
// async getRecordPointText(client, guild, args)

function pickMoneyId(str) {
    if (!str) return null;
    const mats = str.match(/\+?(\d{3,4})/);
    return mats
}

function pickAllMentionId(str) {
    if (!str) return null;
    const regexp = /<@!?(\d{18})>/g;
    const array = [...str.matchAll(regexp)];
    if (array.length) {
        return array;
    }
    return null;
}

function get4000Reward(msg) {
    let str = msg.content;
    if (!str) return 'NaN'
    if (pickAllMentionId(str)) {
        for (let mat of pickAllMentionId(str))
            str = str.replace(mat[0], '');
    }
    let args = pickMoneyId(str)
    if (!args || !args.length) return 'NaN'
    return pickMoneyId(str)[1]
}

async function give4000RewardText(client, guild) {
    var date = new Date(new Date() + (8 * 60 * 60 * 1000))
    let output_prefix = [`==========${date.getMonth() + 1}/${date.getDate()} 記錄區獎勵(money)==========\n`];
    let temp = await client.Mdbcollection.find({ type: "check-msg", channelId: '867811395474423838' }).toArray();
    let user_ids = temp[0].users.filter(function (elem, pos) {
        return temp[0].users.indexOf(elem) == pos;
    })
}