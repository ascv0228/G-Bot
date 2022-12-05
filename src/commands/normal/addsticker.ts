import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import auth from "../../utils/auth";
import dcUtil from "../../utils/discord-util";
import dataJson from "../../data";


export = {
    name: "addsticker",
    aliases: ["as"],
    users: [dataJson["user"]["me"], dataJson["user"]["catcatBug"], dataJson["user"]['lover']],
    description: '增加表情符號',
    permissions: ['Administrator'],
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
        let sticker_url = getImgUrlFromAttachment(msg);
        let name: string
        if (!sticker_url) {
            sticker_url = args[0].startsWith('http') ? args[0] : await dcUtil.getUrl(dcUtil.matchEmoji(args[0]));
            if (!sticker_url)
                return msg.reply({ content: tools.usageString(client, this) });
            name = args[1] || "temp"
        } else {
            name = args[0] || "temp"
        }

        let sticker = await msg.guild.stickers.create({ attachment: sticker_url, name: name, tags: name}).catch((e) => {
            if (`${e}`.includes("maximum size")) {
                msg.reply({ content: `image file's size is too large` })
                return false
            }
            if (`${e}`.includes("DiscordAPIError[50035]")) {
                msg.reply({ content: `this url \`${sticker_url}\`is not image url` })
                return false
            }
            msg.reply({ content: `${e}` })
            tools.Console_Send(client, e);
            return false
        })
        if (sticker)
            return msg.reply({ stickers: [sticker] })


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

