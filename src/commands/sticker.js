const dcUtil = require('../tools/dc-util.js');
let d1 = new Date();

module.exports = {
    name: "sticker",

    async execute(client, msg) {
        let msg1;
        if (msg.type === 'REPLY') {
            msg1 = await msg.fetchReference();
        }
        else return msg.reply("要回覆一則有'貼圖'(sticker)的訊息");
        console.log(msg1)
    }
}

function getWeb() {
    return `https://media.discordapp.net/stickers/917071805422915645.png?size=240`
}