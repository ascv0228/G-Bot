const { prefix } = require('../../config/config.json');
const { token } = require('../../config/token.json');
const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const dbUtil = require('../tools/db-util.js');

module.exports = {
    name: "test",

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        if (!msg.member.hasPermission('MANAGE_ROLES')) return msg.channel.send('You do not have that permission! :x:').then(msg.react('❌'));
        /*let repUser = message.mentions.members.first();
        if (!repUser) {
            message.channel.send('Please mention the user you want to setup the vote for!').then((declineMsg) => {
                message.react('❌');
                declineMsg.delete({
                    timeout: 5000,
                });
            });
            return;
        }*/
        const repVoteEmbed = new Discord.MessageEmbed();
        repVoteEmbed.setTitle('Vote for Representative Members :crown:');
        repVoteEmbed.setFooter(`Vote by: ${msg.author.tag}, started on : ${msg.createdAt}`);
        msg.channel.send(repVoteEmbed).then((msg_) => {
            msg_.react(`✔`).then(() => msg_.react('❌'));
        });


    }
};

