const { prefix } = require('../../config/config.json');
const { token } = require('../../config/token.json');
const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const dbUtil = require('../tools/db-util.js');

module.exports = {
    name: "test",
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        if (!msg.member.permissions.has(this.permissions[0])) return msg.channel.send('You do not have that permission! :x:').then(msg.react('❌'));
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
        repVoteEmbed.setFooter({
            text: `Vote by: ${msg.author.tag}, started on : ${msg.createdAt}`
        });
        msg.delete()
        this_msg = await msg.channel.send({ embeds: [repVoteEmbed], content: "00" })
            .then((msg_) => {
                msg_.react(`✔`)
                    .then(() => msg_.react('❌'));

            });

        msg.channel.send({ content: `${this_msg.id}` })

    }
};


