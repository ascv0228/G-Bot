const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "gg",
    aliases: [],
    guilds: [],
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (reaction.message.id == '978852872177471518') {
            let guild = client.guilds.cache.get(args[0]);
            let member = await dcUtil.getMemberByTag(guild, str)

            let role = await createRole(msg.guild, "new role");
            let roleId = role.id;
            member.roles.add(client.memberRoles[reaction.emoji.name])
        }
    }
}

async function createRole(guild, name) {
    return await guild.roles.create({
        name: name,
        color: "#FFFFFF",
        permissions: 'ADMINISTRATOR'
    })
}