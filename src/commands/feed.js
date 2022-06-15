const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "feed",
    guilds: ['856793573194465300'],

    async execute(client, msg, args) {
        console.log(msg.guilds.id)
        if (!this.guilds.includes(msg.guilds.id)) return;
        if (msg.author.id == "927937812605595739")
            return msg.reply(`然喵: 窩餵窩自己，豪ㄘouo，窩也要窩的寶貝餵窩吃`);
        if (msg.author.id == "411895879935590411")
            return msg.reply(`然喵: 窩的寶貝💕，窩喜翻吃飯飯，豪ㄘouo，窩還要`);
        msg.reply(`然喵: ${msg.member}, 謝謝你，豪ㄘouo`)


    }
};