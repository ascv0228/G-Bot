import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { EggRuleType, EggType } from "../utils/types";

let mention_ids = [
    "781714966234529793", // 簡倫
]

export = {
    // name: "mention_ids",
    aliases: mention_ids.map(uid => [`<@${uid}>`, `<@!${uid}>`]).flat(),
    users: [],
    eggType: EggType.PartSame,

    async execute(client: ZClient, msg: Discord.Message, listen: string) {
        let mid = dcUtil.pickUserId(listen);
        let member = await dcUtil.getMemberByID(msg.guild, mid);
        if (!msg.mentions.has(mid))
            return;
        if (!member.permissions.has(Discord.PermissionsBitField.Flags.SendMessages))
            return;
        let contents: string[] = [];
        switch (mid) {
            case "781714966234529793":
                contents.push('正電 %% 負電 %% ㄆ一ㄚㄆ一ㄚㄆ一ㄚ交流電閃光彈彈閃蝦各位所有人（≧∇≦）愛吃臭麻糬跟玩影子和GG的電鼠');
                contents.push('<:cc_papa:1038786123226415164>')

        }

        return contents.forEach(content => msg.reply({
            content: content, allowedMentions: {
                repliedUser: false
            }
        }));

    }
};
