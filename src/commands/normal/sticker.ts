import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: "sticker",

    description: '獲取回覆訊息的貼圖',
    permissions: [],
    roles: [],
    type: [CmdType.Universal],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        let msg1: Discord.Message;
        if (msg.type === Discord.MessageType.Reply) {
            msg1 = await msg.fetchReference();
        }
        else return msg.reply("要回覆一則有'貼圖'(sticker)的訊息");
        // console.log(msg1)
        if (!msg1.stickers || msg1.stickers.size < 1)
            return msg.reply("要回覆一則有'貼圖'(sticker)的訊息");
        let member = msg.member;
        for (let [id, s] of msg1.stickers) {
            let imageType = s.format == Discord.StickerFormatType.APNG ? '動態貼圖' : '靜態貼圖'
            const avatarEmbed = new Discord.EmbedBuilder()
                .setDescription(s.name)
                .setImage(getWeb_1(id))
                .setFooter({
                    text: member.user.tag,
                    iconURL: member.displayAvatarURL({ forceStatic: false })
                });
            msg.channel.send({ content: imageType, embeds: [avatarEmbed] });
        }
        // console.log(await msg1.stickers.fetch())
    }
}

function getWeb_1(id: string) {
    return `https://media.discordapp.net/stickers/${id}.png?size=240`
}