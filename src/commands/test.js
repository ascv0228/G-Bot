const { prefix } = require('../../config/config.json');
const Discord = require('discord.js');
// import { Buffer } from 'buffer';

module.exports = {
    name: "test",

    async execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        if (!msg.author.id == '411895879935590411') return;
        let temp = await client.Mdbcollection.find({}).toArray();
        // jsonString = JSON.stringify({ ...temp })
        jsonString = JSON.stringify({ ...temp }, null, 4);
        const attachment = new Discord.MessageAttachment(Buffer.from(jsonString, 'utf-8'), 'log.json');
        msg.author.send({ files: [attachment] })
        console.log(args)
        return msg.reply('Finish!');
    }
};