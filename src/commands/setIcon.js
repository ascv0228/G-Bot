const dcUtil = require('../tools/dc-util.js');
const Discord = require('discord.js');
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
        if (args.length == 0 && msg.attachments.length == 0)
            return msg.reply('Need __image__ or __image\'s url__ or __emoji__ or __Color(white、白色、透明.....)__ or __Color\'s Hex(#FFFFFF、#36393f)__');
        let icon = getImgUrlFromAttachment(msg);
        if (!icon) {
            icon = colorMap[args[0]];
        }
        if (!icon) {
            let emoji_id = pickEmojiId(args[0]);
            if (emoji_id) icon = emoji_url(emoji_id);
        }
        if (!icon) {
            icon = args[0];
        }
        if (!icon) {
            icon = getColorUrl(getColor(str))
        }
        let RoleID = roleMap[msg.guild.id]
        let role = await dcUtil.getRoleByID(msg.guild, RoleID)

        role.setIcon(icon)
            .then(updated => {
                const iconEmbed = new Discord.MessageEmbed()
                    .setDescription('臭GG 身分組貼圖更改')
                    .setImage(updated.iconURL({ extension: 'png', size: 4096 }))
                    .setFooter({
                        text: msg.member.user.tag,
                        iconURL: msg.member.displayAvatarURL({ dynamic: true })
                    });
                msg.channel.send({ embeds: [iconEmbed] });
                msg.delete();
            })
            .catch(err => { msg.reply(`Set icon: Error`); console.log(err) });

    }
}
let colorMap = {
    'white': 'https://www.analogouscolors.com/image/512x512/ffffff.jpg',
    '白色': 'https://www.analogouscolors.com/image/512x512/ffffff.jpg',
    '透明': 'https://www.analogouscolors.com/image/512x512/36393f.jpg',
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
    return `https://cdn.discordapp.com/emojis/${id}.webp?size=4096&quality=lossless`
}

function getImgUrlFromAttachment(msg) {
    for (const [_, att] of msg.attachments) {
        let found = suffix_array.find(v => att.url.endsWith(v));
        if (!found) continue;
        return att.url;
    }
    return null;
}
let suffix_array = [
    '.webp', '.png', '.jpg', '.jpeg',
    '.WEBP', '.PNG', '.JPG', '.JPEG',
    '.gif', '.GIF'
]
function getColor(str) {
    if (!str) return null;
    const mats = str.match(/^#?([0-9a-fA-F]{1,6})$/);
    if (mats) {
        return mats[1];
    }
    return null;
}
function getColorUrl(color) {
    return `https://www.analogouscolors.com/image/512x512/${color}.jpg`
}