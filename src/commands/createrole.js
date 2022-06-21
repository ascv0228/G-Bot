const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "createrole",
    aliases: ['cr'],
    guilds: ['988795992667193395'],
    permissions: ['ADMINISTRATOR'],
    Owner: '411895879935590411',

    async execute(client, msg, args) {
        if (!msg.member.permissions.has(this.permissions[0]))
            return;
        if (!this.guilds.includes(msg.guild.id)) return;
        dcUtil.createRole(guild, 'test')
    }
}