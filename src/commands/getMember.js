
const Discord = require('discord.js');

module.exports = {
    name: "getMember",
    aliases: ["gm"],
    guildid: '829673608791851038',

    async execute(client, msg, args) {
        if (!msg.member.permissions.has('ADMINISTRATOR'))
            return;
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

        return;
    }
};