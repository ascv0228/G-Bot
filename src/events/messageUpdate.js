const client = require("../../bot.js");
const { prefix } = require('../../config/config.json');
const rewardUtil = require('../tools/reward-util.js');
const dcUtil = require('../tools/dc-util');
client.on('messageUpdate', function (oldMessage, newMessage) {
    try {
        if (!oldMessage.guild || !newMessage.guild) return;
        if (oldMessage.member.user.bot || newMessage.member.user.bot) return;
    } catch (err) {
        return;
    }
    if (newMessage.channel.id == '867811395474423838') {
        let channel = client.channels.fetch('964516826811858984')
        channel.send({ content: '```' + `${newMessage.member.tag} 在記錄區更改文字\n` + `(old) :${oldMessage.content}\n` + `=> (new) :${newMessage.content}` })
    }
})