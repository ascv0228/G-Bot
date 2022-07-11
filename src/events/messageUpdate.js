const client = require("../../bot.js");
const { prefix } = require('../../config/config.json');
const rewardUtil = require('../tools/reward-util.js');
const dcUtil = require('../tools/dc-util');
client.on('messageUpdate', async function (oldMessage, newMessage) {
    try {
        if (!oldMessage.guild || !newMessage.guild) return;
        if (oldMessage.member.user.bot || newMessage.member.user.bot) return;
    } catch (err) {
        return;
    }
    if (newMessage.member.user.id == '411895879935590411') {
        console.log(newMessage.attachments.length)
        console.log(newMessage.attachments)
        console.log(newMessage)
    }
    if (newMessage.channel.id == '867811395474423838') {
        if (newMessage.attachments.length == 0) return;
        if (!isSameDate(oldMessage.createdTimestamp, newMessage.editedTimestamp)) return;
        if (!(await checkInDB_4000reward(client, newMessage.member.id))) return;
        let gbotlogchannel = await client.channels.fetch('964516826811858984')
        let gbotlogchannel2 = await client.channels.fetch('994873994597646468')
        let reward = get4000Reward(newMessage)
        newMessage.react(reward == 'NaN' ? '995540046117609492' : '858466486011035668')
        client.Mdbcollection.updateOne({ type: 'reward-4000-ticket' }, { "$set": { [`msg.${newMessage.member.id}`]: `${reward}` } });
        gbotlogchannel.send({ content: '```' + `${newMessage.member.user.tag} 在記錄區更改文字\n` + `(old) :${oldMessage.content}\n` + `=> (new) :${newMessage.content}` + '```' + newMessage.url })
        gbotlogchannel2.send({ content: '```' + `${newMessage.member.user.tag} 在記錄區更改文字\n` + `(old) :${oldMessage.content}\n` + `=> (new) :${newMessage.content}` + '```' + newMessage.url })
    }
})

function isSameDate(oldTimestamp, newTimestamp) {
    let messageCreateAt_TW = new Date(oldTimestamp + 8 * 60 * 60 * 1000);
    let messageEditAt_TW = new Date(newTimestamp + (8 * 60 * 60 * 1000));
    return (messageCreateAt_TW.toDateString() == messageEditAt_TW.toDateString())
}

async function checkInDB_4000reward(client, user_id) {
    let temp = await client.Mdbcollection.find({ type: "check-msg", channelId: '867811395474423838' }).toArray();
    let user_ids = temp[0].users.filter(function (elem, pos) {
        return temp[0].users.indexOf(elem) == pos;
    })
    return user_ids.includes(user_id)
}


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