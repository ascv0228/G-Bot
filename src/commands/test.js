const { prefix } = require('../../config/config.json');
const Discord = require('discord.js');
// import { Buffer } from 'buffer';

module.exports = {
    name: "test",

    async execute(client, msg, args) {
        if (!msg.author.id == '411895879935590411') return;
        msg.reply(`${msg.member.permissions}`)
        msg.reply(`${typeof msg.member.permissions}`)
    }
};