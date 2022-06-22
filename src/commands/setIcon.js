const dcUtil = require('../tools/dc-util.js');

let roleMap = {
    '829673608791851038': '988641623384662066',
    '988795992667193395': '988804577509904414'
}


module.exports = {
    name: "seticon",
    aliases: ['si'],
    guilds: ['829673608791851038', '988795992667193395'],
    permissions: ['ADMINISTRATOR'],
    members: ['411895879935590411', '832777502848974920'],
    Owner: '411895879935590411',

    async execute(client, msg, args) {
        if (!this.members.includes(msg.author.id))
            return;
        if (!this.guilds.includes(msg.guild.id))
            return msg.reply('只能用在外星群');
        if (args.length == 0)
            return msg.reply('Need Color Hex');
        console.log(args[0])

        let RoleID = roleMap[msg.guild.id]
        let role = await dcUtil.getRoleByID(msg.guild, RoleID)
        // let org_color = role.hexColor;
        role.setIcon(args[0])

    }
}