const { prefix } = require('../../config/config.json');
const Discord = require('discord.js');
// import { Buffer } from 'buffer';

module.exports = {
    name: "test",

    async execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        if (!msg.author.id == '411895879935590411') return;
        const attachment = new Discord.MessageAttachment(Buffer.from('abcd', 'utf-8'), 'log.txt');
        msg.author.send({ files: [attachment] })
        console.log(args)
        return msg.reply('Finish!');
    }
};