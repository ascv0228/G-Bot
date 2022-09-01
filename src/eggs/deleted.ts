import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { EggRuleType, EggType } from "../utils/types";
import tools from "../utils/tools";
export = {
    name: "deleted",
    aliases: [],
    users: [],
    eggType: EggType.Delete,

    async execute(client: ZClient, msg: Discord.Message, deletor: Discord.User) {
        console.log('AAAAA')
        switch (deletor.id) {
            case "411895879935590411":
                let texts = [
                    "你為什麼要刪除我訊息!!",
                    "刪屁刪!",
                    "哭了..訊息又被刪除QQ..",
                    "別刪了QAQ"
                ]
                await msg.channel.send({ content: `<@${deletor.id}>, ${texts[tools.randInt(1, texts.length - 1)]}` })
                break;
        }

    }

};