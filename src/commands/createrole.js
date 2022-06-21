const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "setcolorrandom",
    aliases: ['scr', 'cr'],
    guilds: ['988795992667193395'],
    permissions: ['ADMINISTRATOR'],
    members: ['411895879935590411', '832777502848974920'],
    Owner: '411895879935590411',

    async execute(client, msg, args) {
        if (!this.members.includes(msg.author.id))
            return;
        if (!this.guilds.includes(msg.guild.id))
            return msg.reply('只能用在臭GG群');
        /*
        let role = await dcUtil.createRole(msg.guild, 'test');
        let member = await dcUtil.getMemberByID(msg.guild, '848194732143542324')
        member.roles.add(role.id)*/
        let RoleID = '988804577509904414'
        let role = await dcUtil.getRoleByID(msg.guild, RoleID)
        let org_color = role.hexColor;
        role.setColor('RANDOM')
            .then(updated => msg.reply(`Color: ${org_color} -> ${updated.hexColor}`))
            .catch(console.error);

    }
}