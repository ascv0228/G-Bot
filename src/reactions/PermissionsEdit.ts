import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { ReactionHandle } from "../structure/reactionExecutor";
import auth from "../utils/auth";
import tools from "../utils/tools";

let handle_Obj = new Map(Object.entries({
    '988964977224318986': {
        something: {
            'guild': '856793573194465300',
            'role': '987326459402145852',
            'permissions': {
                'messageReactionAdd': [Discord.PermissionFlagsBits.Administrator],
                'messageReactionRemove': []
            }
        },
        emoji: ['✅'],
        unable: {
        },
        enable: {
        },
        clear_other_emoji: true, // 清除 不是選項的emoji
        clear_options_emoji: false, // 清除 其他選項的emoji
        clear_this_emoji: false, // 清除自身emoji
    } as ReactionHandle,

}));

export = {
    name: "PermissionsEdit",
    message_Id: [...handle_Obj.keys()],
    handle_Obj: handle_Obj,

    async execute(client: ZClient, event: string, reaction: Discord.MessageReaction, user: Discord.User) {
        console.log(this.name)
        let obj = this.handle_Obj.get(reaction.message.id)
        let roleId = obj.something['role'];
        let guild = client.guilds.cache.get(obj.something['guild']);
        if (!roleId) return;
        let role = await dcUtil.getRoleByID(guild, roleId);
        console.log(role.name, event)
        console.log(obj.something['permissions'][event])

        switch (event) {
            case 'messageReactionAdd':
                role.edit({ permissions: obj.something['permissions'][event] })
                break;
            case 'messageReactionRemove':
                role.edit({ permissions: obj.something['permissions'][event] })
                break;

        }
    }
};