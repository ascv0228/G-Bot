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
    if (newMessage.member.id == '411895879935590411') {
        let channel = await client.channels.fetch('964516826811858984')
        if (!isSameDate(oldMessage.createdTimestamp, newMessage.editedTimestamp)) return;
        await checkInDB_4000reward(client, newMessage.member.id);
        // channel.send({ content: '```' + `${newMessage.member.user.tag} 在記錄區更改文字\n` + Title + '\n' + `(old) :${oldMessage.content}\n` + `=> (new) :${newMessage.content}` + '```' })

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
    console.log(user_ids)
}