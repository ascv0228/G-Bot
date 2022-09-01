import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { EggRuleType, EggType } from "../utils/types";

export = {
    name: "早安",
    aliases: ["早ㄢ", "早ㄤ", "棗安", "棗ㄢ", "棗ㄤ", "澡ㄢ"],
    users: ["411895879935590411", "976785151126282250"],
    eggType: EggType.PartWithStartSame,

    async execute(client: ZClient, msg: Discord.Message, listen: string) {
        switch (msg.author.id) {
            case this.users[0]:
                return msg.reply({ content: '棗安' });
            case this.users[1]:
                return msg.reply({ content: '臭GG 澡ㄢ' });
        }

    }
};