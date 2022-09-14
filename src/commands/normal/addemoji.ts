import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import auth from "../../utils/auth";
import dcUtil from "../../utils/discord-util";
import { Executor } from "../../structure/executor";

export = {
    name: "addemoji",
    aliases: ["ae"],
    users: ["411895879935590411", "976785151126282250", "832777502848974920"],
    description: '增加表情符號',
    permissions: [],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        ["(image_attachment)", ""],
        ["                  ", "<image_url>"],
        ["                  ", "<emoji>"]
    ],
    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        // if (!this.member.includes(msg.author.id)) return;
        if (!args.length && !msg.attachments.size)
            return msg.reply({ content: tools.usageString(client, this) });
        let emoji_url = getImgUrlFromAttachment(msg);
        let name: string
        if (!emoji_url) {
            emoji_url = args[0].startsWith('http') ? args[0] : await dcUtil.getUrl(dcUtil.matchEmoji(args[0]));
            console.log(args[0])
            console.log(emoji_url)
            if (!emoji_url)
                return msg.reply({ content: tools.usageString(client, this) });
            name = args[1] || "temp"
        } else {
            name = args[0] || "temp"
        }

        let emoji = await msg.guild.emojis.create({ attachment: emoji_url, name: name }).catch((e) => {
            if (e.includes("maximum size")) {
                msg.reply({ content: `image file's size is too large` })
                return false
            }
            msg.reply({ content: `${e}` })
            return false
        })
        if (emoji)
            return msg.reply({ content: `增加 ${emoji}` })


    }
};

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

