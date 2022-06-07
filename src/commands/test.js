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
        var date2 = new Date(d1 + (parseInt(args[0]) * 60 * 1000))
        let timeStr = date2.toString().split(' GMT')[0]

        const repVoteEmbed = new Discord.MessageEmbed();
        repVoteEmbed.setTitle(`${msg.author.tag} 發起新活動`)
            .setDescription(args.slice(1).join("\n") + `\n\n限時${args[0]}分鐘\n於${timeStr}結束`)
            .setFooter({
                text: msg.author.tag,
                iconURL: msg.member.displayAvatarURL({ dynamic: true })
            });
        msg.delete()
        // let roleid = dcUtil.createRole(msg.guild, "活動參與者").id;
        let role = await createRole(msg.guild, "活動參與者");
        let roleid = role.id;
        msg.channel.send({ content: "roleid: " + roleid })
        msg.channel.send({ embeds: [repVoteEmbed], content: "活動進行中，點選下方貼圖" })
            .then((msg_) => {
                msg_.react(`✅`)
                let id = msg_.id;
                client.command_member_role.set(id, roleid);
                setTimeout(() => {
                    msg.channel.messages.fetch(id).then(msg => msg.delete());
                    client.command_member_role.delete(id);
                    msg.channel.send({ embeds: [repVoteEmbed.setDescription(args.slice(1).join("\n") + `\n活動已於${timeStr}結束"`)], content: "活動結束" })
                }, `${Number(args[0]) * 60 * 1000}`)
            });
    }
};

async function createRole(guild, name) {
    return await guild.roles.create({
        name: name,
        color: "RANDOM",
    })
}
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