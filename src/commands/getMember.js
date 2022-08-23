
const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "getMember",
    aliases: ["gm"],
    guildid: '829673608791851038',

    async execute(client, msg, args) {
        if (!msg.member.permissions.has('ADMINISTRATOR'))
            return;
        if (args.length)
            return msg.reply('需要標記身分組')

        if (!dcUtil.pickRoleId(args[0]))
            return msg.reply('未知身分組')
        let role = await dcUtil.getRoleByID(msg.guild, dcUtil.pickRoleId(args[0]));
        let members = role.members.keys()

        let output = new Array();
        for (const id of members) {
            output.push(`${id}`)
        }

        const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), `log.txt`);
        msg.author.send({ files: [attachment] });

    }
};