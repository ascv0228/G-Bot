const { prefix } = require('../../config/config.json');
const { token } = require('../../config/token.json');
const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const dbUtil = require('../tools/db-util.js');
const { Permissions } = require('discord.js');
module.exports = {
    name: "cc",
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        dbUtil.dbInitActivityCommand(client, args);
        /*
        if (!msg.member.permissions.has(this.permissions[0]))
            return msg.channel.send('You do not have that permission! :x:').then(msg.react('❌'));

        categoryId = '834103866772946944'

        p = [
            {
                id: msg.guild.id,
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
            },
            {
                id: msg.author.id,
                allow: [Permissions.FLAGS.VIEW_CHANNEL],
            },
        ]
        dcUtil.createTextChannel(msg.guild, "test", categoryId, p)*/
    }
};

