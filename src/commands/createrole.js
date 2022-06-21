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
        /*
        let role = await dcUtil.createRole(msg.guild, 'test');
        let member = await dcUtil.getMemberByID(msg.guild, '848194732143542324')
        member.roles.add(role.id)*/
        let RoleID = '988804577509904414'
        let role = await dcUtil.getRoleByID(msg.guild, RoleID)
        role.setColor('RANDOM')
            .then(updated => msg.reply(`Color: ${updated.color}`))
            .catch(console.error);

    }
}