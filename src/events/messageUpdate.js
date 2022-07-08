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
        let messageCreateAt_TW = new Date(oldMessage.createdTimestamp + 8 * 60 * 60 * 1000)
        let nowDate_TW = new Date(new Date() + (8 * 60 * 60 * 1000));
        console.log(messageCreateAt_TW)
        console.log(nowDate_TW)
        console.log(messageCreateAt_TW.toDateString())
        console.log(nowDate_TW.toDateString())
        let Title = (messageCreateAt_TW.toDateString() == nowDate_TW.toDateString()) ?
            '✅' + '編輯同一天的訊息' : '❌' + '編輯不同一天的訊息'
        channel.send({ content: '```' + `${newMessage.member.user.tag} 在記錄區更改文字\n` + Title + '\n' + `(old) :${oldMessage.content}\n` + `=> (new) :${newMessage.content}` + '```' })
    }
})