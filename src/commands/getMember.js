
const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "getMember",
    aliases: ["gm"],
    guildid: '829673608791851038',

    async execute(client, msg, args) {
        if (!msg.member.permissions.has('ADMINISTRATOR'))
            return;
        // let member = await dcUtil.getMemberByTag(msg.guild, args[0]) || msg.member;
        // console.log(member)

        let members = await msg.guild.members.fetch({ force: true })
        console.log(members.size)
        let output = new Array();
        for (const [id, member] of members) {
            let userTag = `{"member": "${member.user.tag}", "id": "${id}"}, `;
            output.push(userTag)
        }

        const attachment = new Discord.MessageAttachment(Buffer.from(output.join('\n')), `log.txt`);
        msg.author.send({ files: [attachment] });
        output = new Array();
        for (const [id, member] of members) {
            let userTag = `{"member": "${member.user.tag}", "id": "${id}"}, `;
            output.push(userTag)
        }
        let mem1 = (await msg.guild.roles.fetch('962282549021929532')).members.map(m => `{"member": "${m.user.tag}", "id": "${m.user.id}"}, `);
        const attachment1 = new Discord.MessageAttachment(Buffer.from(mem1.join('\n')), `ET1.txt`);
        msg.author.send({ files: [attachment1] });
        let mem2 = (await msg.guild.roles.fetch('962283032683880548')).members.map(m => `{"member": "${m.user.tag}", "id": "${m.user.id}"}, `);
        const attachment2 = new Discord.MessageAttachment(Buffer.from(mem2.join('\n')), `ET2.txt`);
        msg.author.send({ files: [attachment2] });
        let mem3 = (await msg.guild.roles.fetch('962283113097101322')).members.map(m => `{"member": "${m.user.tag}", "id": "${m.user.id}"}, `);
        const attachment3 = new Discord.MessageAttachment(Buffer.from(mem3.join('\n')), `ET3.txt`);
        msg.author.send({ files: [attachment3] });
        return;
    }
};