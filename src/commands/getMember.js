
const Discord = require('discord.js');

module.exports = {
    name: "getMember",
    aliases: ["gm"],
    guildid: '829673608791851038',

    async execute(client, msg, args) {
        if (!msg.member.permissions.has('ADMINISTRATOR'))
            return;
        // let guild = await client.guilds.cache.get(this.guildid);
        // let members = await msg.guild.members.filter(m => m.roles.cache.has(args[0]))
        // let members = await msg.guild.roles.cache.get(args[0]).members.map(m => m.user.id);
        const Role = msg.guild.roles.cache.find(role => role.name == args[0]);
        const members = msg.guild.members.cache.filter(member => member.roles.cache.find(role => role == Role))
        console.log(members)
        let output = new Array();
        for (const [id, member] of members) {
            let userTag = `${args[1]} @${member} ${args[2]}`;
            output.push(userTag)
        }

        const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), `log.txt`);
        msg.author.send({ files: [attachment] });

        return;
    }
};