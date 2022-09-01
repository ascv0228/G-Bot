import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { ReactionHandle } from "../structure/ReactionExecutor";
let handle_Obj = new Map(Object.entries({
    "991257219356168242": {
        something: {
            name: 'catOpen',
            func: catcat
        },
        emoji: {
            '✅': true,
            '❌': false
        },
        unable: {
        },
        enable: {
            users: ['411895879935590411', '832777502848974920'],
        },
        clear_other_emoji: false, // 清除 不是選項的emoji
        clear_options_emoji: false, // 清除 其他選項的emoji
        clear_this_emoji: true, // 清除自身emoji
    } as ReactionHandle,
}));

export = {
    name: "botStatus",
    message_Id: [...handle_Obj.keys()],
    handle_Obj: handle_Obj,

    async execute(client: ZClient, event: string, reaction: Discord.MessageReaction, user: Discord.User) {
        const member = await dcUtil.getMemberByID(reaction.message.guild, user.id);
        if (this[event]) {
            this[event](client, reaction, member)
        }
    },
    async messageReactionAdd(client: ZClient, reaction: Discord.MessageReaction, member: Discord.GuildMember) {
        let handle = handle_Obj.get(reaction.message.id)
        client.botStatus[handle.something['name']] = handle.emoji[dcUtil.uniqueEmoji(reaction.emoji)]
        if (handle.something['func']) {
            handle.something['func'](client, reaction)
        }
    },
};

async function catcat(client: ZClient, reaction: Discord.MessageReaction) {
    // https://discord.com/channels/988795992667193395/991256310563733564/991257219356168242
    await reaction.message.edit({ content: '`臭貓貓` 狀態: ' + (client.botStatus['catOpen'] ? '開 (✅)' : '關 (❌)') });
    let guild = client.guilds.cache.get('829673608791851038');
    let role = await dcUtil.getRoleByID(guild, '988641623384662066');
    role.setMentionable(client.botStatus['catOpen'])
}//.setMentionable(true)