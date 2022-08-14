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
    members: ['411895879935590411', '976785151126282250'],
    Owner: '411895879935590411',

    async execute(client, msg, args) {

        if (args.length == 0)
            return msg.reply('Need Color Hex');
        if (getColor(args[0]) == null)
            return msg.reply('Error Color Hex :  #FFFFFF、FFFFFF');

        let role;

        switch (msg.guild.id) {
            case '1002583252923596820':
                role = msg.guild.roles.cache.find(role => role.name === `${msg.author.id}`);
                if (!!role)
                    break;
                let pos = msg.guild.roles.cache.get('1004332619971956777').position
                role = await msg.guild.roles.create({
                    name: `${msg.author.id}`,
                    position: pos
                })
                break;

            case '829673608791851038':
                if (!msg.member.roles.cache.has('988641623384662066'))
                    return msg.reply({ content: '無可用私人的身分組' })
                role = await msg.guild.roles.fetch('988641623384662066');
                break;

            case '988795992667193395':
                role = await msg.guild.roles.fetch('988804577509904414');
                break;

            default:
                return msg.reply({ content: '無可用私人的身分組' })


        }


        if (!msg.member.roles.cache.has(role.id)) {
            msg.member.roles.add(role.id)
        }

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