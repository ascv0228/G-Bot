import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import { ReactionHandle } from "../../structure/reactionExecutor";

let handle_Obj = {
    emoji: ['✅'],
    clear_other_emoji: true, // 清除 不是選項的emoji
    clear_options_emoji: true, // 清除 其他選項的emoji
    clear_this_emoji: false, // 清除自身emoji
} as ReactionHandle

export = {
    name: "activity",
    mat: /^發起新活動$/,
    reactions: ['✅'],
    handle_Obj: handle_Obj,


    async execute(client: ZClient, event: string, reaction: Discord.MessageReaction, user: Discord.User) {
        if (reaction.message.mentions.roles.size != 1)
            return;
        let role = reaction.message.mentions.roles.values().next().value as Discord.Role
        const member = await dcUtil.getMemberByID(reaction.message.guild, user.id);
        switch (event) {
            case 'messageReactionAdd':
                member.roles.add(role.id)
                break;
            case 'messageReactionRemove':
                member.roles.remove(role.id)
                break;

        }
    }
};

