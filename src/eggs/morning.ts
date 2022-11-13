import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { EggRuleType, EggType } from "../utils/types";
import dataJson from "../data";

let front = ["早", "找", "棗", "澡", "鑿"]
let end = ["安", "ㄢ", "鞍", "氨", "ㄤ"]

export = {
    name: "早安",
    aliases: front.map(f => end.map(e => f + e)).flat(),
    users: [dataJson["user"]["me"], dataJson["user"]["catcatBug"], dataJson["user"]["lover"]],
    roles: [dataJson["role"]["臭GG"]],
    eggType: EggType.PartWithStartSame,

    async execute(client: ZClient, msg: Discord.Message, listen: string) {
        switch (msg.author.id) {
            case dataJson["user"]["me"]:
                return msg.reply({ content: '棗安' });
            default:
                return msg.reply({ content: '臭GG 澡ㄢ' });
        }

    }
};