const { prefix } = require('../../config/config.json');
const { token } = require('../../config/token.json');
const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const dbUtil = require('../tools/db-util.js');

module.exports = {
    name: "test",

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        const Discord = require('discord.js');
        const bot = new Discord.Client();
        bot.on('message', async (message) => {
            if (message.author.bot) return;
            if (message.content.startsWith(prefix + 'repvote')) {
                if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('You do not have that permission! :x:').then(message.react('❌'));
                let repUser = message.mentions.members.first();
                if (!repUser) {
                    message.channel.send('Please mention the user you want to setup the vote for!').then((declineMsg) => {
                        message.react('❌');
                        declineMsg.delete({
                            timeout: 5000,
                        });
                    });
                    return;
                }
                const repVoteEmbed = new Discord.MessageEmbed();
                repVoteEmbed.setTitle('Vote for Representative Members :crown:');
                repVoteEmbed.setDescription(`User ${repUser} wants to recieve Representative Members :crown: role! Do you agree?`);
                repVoteEmbed.setFooter(`Vote by: ${message.author.tag}, started on : ${message.createdAt}`);
                message.channel.send(repVoteEmbed).then((msg) => {
                    msg.react(`✔`).then(() => msg.react('❌'));
                });
            }
        });


    }
};

