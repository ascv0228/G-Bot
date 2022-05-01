
const Discord = require('discord.js');

module.exports = {
    name: "getMember",
    aliases: ["gm"],
    guildid: '829673608791851038',

    async execute(client, msg, args) {
        if (!msg.member.permissions.has('ADMINISTRATOR'))
            return;
        // let guild = await client.guilds.cache.get(this.guildid);
        let members = await msg.guild.members.filter(m => m.roles.cache.has(args[0]))
        let output = new Array();
        for (const [id, member] of members) {
            let userTag = `${args[1]} @${member.tag} ${args[2]}`;
            output.push(userTag)
        }

        const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), `log.txt`);
        msg.author.send({ files: [attachment] });

        return;
    }
};