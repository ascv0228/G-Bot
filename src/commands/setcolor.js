const dcUtil = require('../tools/dc-util.js');

let roleMap = {
    '829673608791851038': '988641623384662066',
    '988795992667193395': '988804577509904414'
}


module.exports = {
    name: "setcolor",
    aliases: ['sc'],
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
        if (getColor(args[0]) == null)
            return msg.reply('Error Color Hex :  #FFFFFF、FFFFFF');

        let RoleID = roleMap[msg.guild.id]
        let role = await dcUtil.getRoleByID(msg.guild, RoleID)
        let org_color = role.hexColor;
        role.setColor(getColor(args[0]))
            .then(updated => msg.reply(`Color: ${org_color} -> ${updated.hexColor}`))
            .catch(console.error);

    }
}

function getColor(str) {
    if (!str) return null;
    const mats = str.match(/^#?([0-9a-fA-F]{1,6})$/);
    if (mats) {
        return '#' + mats[1];
    }
    return null;
}