const Discord = require('discord.js');

module.exports = {
    name: "getDB",
    permiss_user: ['411895879935590411', '702385586941722654', '342604295520124939',
        '830469275528986695', '765629373084074064'],
    guilds: ['829673608791851038', '864925734581043280'],

    async execute(client, msg, args) {
        if (!this.permiss_user.includes(msg.author.id))
            return;
        if (!(this.guilds.includes(msg.guild.id)))
            return;
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
        if (args.includes('reward')) {
            getReward(client, msg, args);
            getBigReward(client, msg, args);
            get4000Reward(client, msg, args);
        }
        if (args.includes('check-msg'))
            getCheckMsg(client, msg, args)
        if (args.includes('activity') || args.includes('ActivityCommand'))
            getActivityCommand(client, msg, args);

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

async function getBigReward(client, msg, args) {
    let temp = await client.Mdbcollection.find({ type: 'reward-big-ticket' }).toArray();
    jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.MessageAttachment(Buffer.from(jsonString, 'utf-8'), 'log.json');
    msg.author.send({ files: [attachment] });
}
async function get4000Reward(client, msg, args) {
    let temp = await client.Mdbcollection.find({ type: 'reward-4000-ticket' }).toArray();
    jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.MessageAttachment(Buffer.from(jsonString, 'utf-8'), 'log.json');
    msg.author.send({ files: [attachment] });
    console.log(temp)
    console.log(jsonString)
}



async function getCheckMsg(client, msg, args) {
    let temp = await client.Mdbcollection.find({ type: 'check-msg' }).toArray();
    jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.MessageAttachment(Buffer.from(jsonString, 'utf-8'), 'log.json');
    msg.author.send({ files: [attachment] });
}

async function getActivityCommand(client, msg, args) {
    let temp = await client.Mdbcollection.find({ type: 'ActivityCommand' }).toArray();
    jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.MessageAttachment(Buffer.from(jsonString, 'utf-8'), 'log.json');
    msg.author.send({ files: [attachment] });
}