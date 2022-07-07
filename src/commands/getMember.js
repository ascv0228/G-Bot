
const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "getMember",
    aliases: ["gm"],
    guildid: '829673608791851038',

    async execute(client, msg, args) {
        if (!msg.member.permissions.has('ADMINISTRATOR'))
            return;
        let member = await dcUtil.getMemberByTag(msg.guild, args[0]) || msg.member;
        console.log(member)
        /*
        let members = await msg.guild.members.fetch({ force: true })
        console.log(members.size)
        let order_userTag = new Map();
        let output = new Array();
        for (const [id, member] of members) {
            let userTag = `x!point <@${id}> 2`;
            output.push(userTag)
        }
    
        const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), `log.txt`);
        msg.author.send({ files: [attachment] });
        */
        return;
    }
};