const { prefix } = require('../../config/config.json');
const Discord = require('discord.js');

module.exports = {
    name: "getDB",
    permiss_user: ['411895879935590411', '702385586941722654', '342604295520124939',
        '830469275528986695', '765629373084074064'],

    async execute(client, msg, args) {
        if (!permiss_user.includes(msg.author.id)) return;
        if (args.length == 0 || args.includes('-h')) {
            temp = [
                '`' + 'all' + '`' + " : 查看全部",
                '`' + 'reward' + '`' + " : 查看輔助獎勵",
                '`' + 'check-msg' + '`' + " : 查看當日記錄區發文記錄",
                '`' + '-h' + '`' + " : 查看參數"
            ]
            return msg.reply({ content: temp.join("\n") });
        }
        if (args.includes('all'))
            getAll(client, msg, args);
        if (args.includes('reward'))
            getReward(client, msg, args);
        if (args.includes('check-msg'))
            getCheckMsg(client, msg, args)

        return msg.reply('Finish!');
    }
};


async function getAll(client, msg, args) {
    let temp = await client.Mdbcollection.find({}).toArray();
    jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.MessageAttachment(Buffer.from(jsonString, 'utf-8'), 'log.json');
    msg.author.send({ files: [attachment] });
}

async function getReward(client, msg, args) {
    let temp = await client.Mdbcollection.find({ type: 'reward-ticket' }).toArray();
    jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.MessageAttachment(Buffer.from(jsonString, 'utf-8'), 'log.json');
    msg.author.send({ files: [attachment] });
}

async function getCheckMsg(client, msg, args) {
    let temp = await client.Mdbcollection.find({ type: 'check-msg' }).toArray();
    jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.MessageAttachment(Buffer.from(jsonString, 'utf-8'), 'log.json');
    msg.author.send({ files: [attachment] });
}