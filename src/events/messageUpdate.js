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
    if (newMessage.channel.id == '964516826811858984') {
        let channel = await client.channels.fetch('964516826811858984')
        let messageCreateAt_TW = oldMessage.createAt + 8 * 60 * 60 * 1000
        let nowDate_TW = new Date() + (8 * 60 * 60 * 1000);
        let Title = (messageCreateAt_TW.setHours(0, 0, 0, 0) == nowDate_TW.setHours(0, 0, 0, 0)) ?
            '✅' + '編輯同一天的訊息' : '❌' + '編輯不同一天的訊息'
        if (oldMessage.createAt)
            channel.send({ content: '```' + `${newMessage.member.user.tag} 在記錄區更改文字\n` + Title + '\n' + `(old) :${oldMessage.content}\n` + `=> (new) :${newMessage.content}` + '```' })
    }
})