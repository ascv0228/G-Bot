import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { EggRuleType, EggType } from "../utils/types";
export = {
    name: "mention",
    aliases: [],
    users: [],
    eggType: EggType.Mention,

    async execute(client: ZClient, msg: Discord.Message, listen: string) {
        switch (msg.author.id) {
            case "411895879935590411":
                msg.reply('我在')
                break;
            default:
            // if (msg.type === Discord.MessageType.Reply) {
            //     let msg1 = await ms;
            // }
            // msg.reply(`${client.prefix}help`)
        }

    }

};