import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import { ReactionHandle } from "../../structure/reactionExecutor";

let handle_Obj = {
    emoji: ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'],
    clear_other_emoji: true, // 清除 不是選項的emoji
    clear_options_emoji: true, // 清除 其他選項的emoji
    clear_this_emoji: false, // 清除自身emoji
} as ReactionHandle

export = {
    name: "vote",
    mat: /^投票進行中$/,
    reactions: handle_Obj.emoji as string[],
    handle_Obj: handle_Obj,

    async execute(client: ZClient, event: string, reaction: Discord.MessageReaction, user: Discord.User) {
    },
};

