import Discord from "discord.js";
import tools from "../../../utils/tools";
import dcUtil from "../../../utils/discord-util";
import { ZClient } from "../../../structure/client";
import { CmdType } from "../../../utils/types";
import dataJson from "../../../data"

export = {
    name: "setRoleIcon",
    aliases: ['sri', 'setroleicon', 'roleicon'],
    guilds: [],

    description: '設定身分組圖像',
    permissions: ['Administrator'],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        ["(image_attachment)", "<role>", ""],
        ["                  ", "<role>", "<image's url>"],
        ["                  ", "<role>", "<emoji>"],
        ["                  ", "<role>", "<ColorHex>"],
    ],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (msg.guild.premiumTier < 2)
            return msg.reply('伺服器加成等級不足2');
        if (args.length < 2  || (args.length < 1 && msg.attachments.size == 0))
            return msg.reply({ content: tools.usageString(client, this) });
        let icon = getImgUrlFromAttachment(msg);
        if (!icon) {
            icon = colorMap[args[1]];
        }
        if (!icon) {
            let emoji_id = pickEmojiId(args[1]);
            if (emoji_id) icon = emoji_url(emoji_id);
        }
        if (!icon) {
            let color = pickColorHex(args[1])
            if (color != null) icon = getColorUrl(color)
        }
        if (!icon) {
            icon = args[1];
        }
        let role = await msg.guild.roles.fetch(dcUtil.pickRoleId(args[0]));

        if (!role) {
            return msg.reply({ content: '無效的身分組' })
        }
        // console.log(icon)
        role.setIcon(icon)
            .then(updated => {
                const iconEmbed = new Discord.EmbedBuilder()
                    .setDescription(`<@&${role.id}> 貼圖更改`)
                    .setImage(updated.iconURL({ extension: 'png', size: 4096 }))
                    .setFooter({
                        text: msg.member.user.tag,
                        iconURL: msg.member.displayAvatarURL({ forceStatic: false })
                    });
                // console.log(updated.iconURL({ extension: 'png', size: 4096 }))
                msg.channel.send({ embeds: [iconEmbed] });
                msg.delete();
            })
            .catch(err => { msg.reply(`Set icon: Error`); console.log(err) });

    }
}
let colorMap = {
    'white': 'https://www.analogouscolors.com/image/512x512/ffffff.jpg',
    '白色': 'https://www.analogouscolors.com/image/512x512/ffffff.jpg',
    '透明': 'https://cdn.discordapp.com/emojis/1038517255845200022.png?quality=lossless&size=4096'
    // '透明': 'https://www.analogouscolors.com/image/512x512/36393f.jpg',
};

function pickEmojiId(str: string): string {
    if (!str) return null;
    let mats = str.match(/^<a?:(\w+):(\d+)>$/);
    if (mats) {
        return mats[2];
    }
    mats = str.match(/^https:\/\/cdn\.discordapp\.com\/emojis\/(\d+)\.(?:png|gif|webp)(\?(?:size|quality)\=[A-Za-z0-9]+(&(?:size|quality)\=[A-Za-z0-9]+)?)?$/)
    if (mats) {
        return mats[1];
    }
    return null;
}

function emoji_url(id: string): string {
    return `https://cdn.discordapp.com/emojis/${id}.png?size=4096&quality=lossless`
}

function getImgUrlFromAttachment(msg: Discord.Message): string {
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
function pickColorHex(str: string): string {
    if (!str) return null;
    const mats = str.match(/^#?([0-9a-fA-F]{1,6})$/);
    if (mats) {
        return mats[1];
    }
    return null;
}
function getColorUrl(color: string): string {
    return `https://www.analogouscolors.com/image/512x512/${color}.jpg`
}
