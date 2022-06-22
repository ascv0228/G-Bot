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
            return msg.reply('Need __image\'s url__ or __emoji__ or __Color("white"、"白色"、"#FFFFFF"、"透明".....)__');
        let icon = colorMap[args[0]];
        if (!icon) {
            let emoji_id = pickEmojiId(args[0]);
            if (emoji_id) icon = emoji_url(emoji_id);
        }
        if (!icon) {
            icon = args[0]
        }

        let RoleID = roleMap[msg.guild.id]
        let role = await dcUtil.getRoleByID(msg.guild, RoleID)
        // let org_color = role.hexColor;
        role.setIcon(icon)
            .then(updated => msg.reply(`Set icon: ${icon}`))
            .catch(msg.reply(`Set icon: Error`));

    }
}
let colorMap = {
    'white': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+P///38ACfsD/QVDRcoAAAAASUVORK5CYII=',
    '白色': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+P///38ACfsD/QVDRcoAAAAASUVORK5CYII=',
    'FFFFFF': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+P///38ACfsD/QVDRcoAAAAASUVORK5CYII=',
    '#FFFFFF': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+P///38ACfsD/QVDRcoAAAAASUVORK5CYII=',
    'ffffff': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+P///38ACfsD/QVDRcoAAAAASUVORK5CYII=',
    '#ffffff': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+P///38ACfsD/QVDRcoAAAAASUVORK5CYII=',
    '透明': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjMLO0/w8AAwUBrjnr9IQAAAAASUVORK5CYII='
};

function pickEmojiId(str) {
    if (!str) return null;
    const mats = str.match(/^<:(\w+):(\d+)>$/);
    if (mats) {
        return mats[2];
    }
    return null;
}

function emoji_url(id) {
    return `https://cdn.discordapp.com/emojis/${id}.webp?size=480&quality=lossless`
}
