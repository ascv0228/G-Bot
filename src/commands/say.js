const { prefix } = require('../../config/config.json');
const { token } = require('../../config/token.json');
const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const dbUtil = require('../tools/db-util.js');

module.exports = {
    name: "say",

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        msg.delete()
            .then(msg.channel.send({ content: args.join(" ") }))



    }
};
