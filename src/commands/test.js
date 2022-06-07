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
        if (!msg.member.permissions.has(this.permissions[0]))
            return msg.channel.send('You do not have that permission! :x:').then(msg.react('❌'));
        if (args.length == 0) {
            return msg.channel.send({ content: `g!${this.name} <time in minute> <content>` })
        }
        let d1 = new Date().getTime();
        d1 += (8 * 60 * 60 * 1000);
        var date = new Date(d1)
        var date2 = new Data(d1 + (parseInt(args[0]) * 60 * 1000))
        let output = [`==========${date.getMonth() + 1}/${date.getDate()} 輔助獎勵區==========\n`];

        const repVoteEmbed = new Discord.MessageEmbed();
        repVoteEmbed.setTitle(`${msg.author.tag} 發起新活動`)
            .setDescription(args.slice(1).join("\n") + `\n\n限時${args[0]}分鐘\n於${date2.toString().split(' GMT')[0]}結束`)
            .setFooter({
                text: msg.author.tag,
                iconURL: msg.member.displayAvatarURL({ dynamic: true })
            });
        msg.delete()
        this_msg = await msg.channel.send({ embeds: [repVoteEmbed], content: "00" })
            .then((msg_) => {
                msg_.react(`✔`)
                    .then(() => msg_.react('❌'));
                let id = msg_.id;
                msg.channel.send({ content: `${id}` })
                setTimeout(() => {
                    msg.channel.messages.fetch(id).then(msg => msg.delete());
                    msg.channel.send({ embeds: [repVoteEmbed.setDescription(args.slice(1).join("\n") + "\n結束")], content: "活動結束" })
                }, "5000")
            });



    }
};


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