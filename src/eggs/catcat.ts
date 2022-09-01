import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { EggRuleType, EggType } from "../utils/types";
export = {
    name: "臭貓貓",
    aliases: ["臭喵喵"],
    guilds: ['829673608791851038', '988795992667193395'],
    eggType: EggType.PartSame,

    async execute(client: ZClient, msg: Discord.Message, listen: string) {
        if (client.botStatus['catOpen'])
            return msg.reply({ content: `<@832777502848974920>` })
                .catch(() => { })
    }

};

