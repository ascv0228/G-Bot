const client = require("../../bot.js");

client.on('guildMemberAdd', async member => {
    if (member.guild.id == '829673608791851038') {
        member.roles.add('986888997538246748');
    }
    if (member.guild.id == '1002583252923596820') {
        member.roles.add('1004332619971956777')
        let role = member.guild.roles.cache.find(role => role.name === `${member.user.id}`);
        if (!role) {
            let pos = member.guild.roles.cache.get('1004332619971956777').position
            let newRole = await member.guild.roles.create({
                name: `${member.user.id}`,
                position: pos
            })
            member.roles.add(newRole.id)
        }
        else {
            member.roles.add(role.id)
        }
    }
});