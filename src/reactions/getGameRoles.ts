import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { ReactionHandle } from "../structure/reactionExecutor";
import auth from "../utils/auth";

let handle_Obj = new Map(Object.entries({
    "1000625595199266946": {
        emoji: {
            '865515400191934464': "1000623130060017784", //我還想要協同
        },
        unable: {
        },
        enable: {
            roles: ['987187660172955710'],
        },
        clear_other_emoji: true, // 清除 不是選項的emoji
        clear_options_emoji: false, // 清除 其他選項的emoji
        clear_this_emoji: false, // 清除自身emoji
    } as ReactionHandle,
    "978852872177471518": {
        emoji: {
            '0️⃣': "853647561024864266", //決勝
            '1️⃣': "931946175827959819", //藍BUFF
            '2️⃣': "977361812343369768", //APEX m
            '3️⃣': "968413297491738635", //打瓦
            '4️⃣': "973560687567720488", //PUBG
            '5️⃣': "938768045646700594", //日麻
            '6️⃣': "967797624621109248", //LOL
            '7️⃣': "960013742777704490", //人偶
            '8️⃣': "978841314546315284", //元氣騎士
            '9️⃣': '983103203744813076', //原神
            '🔟': '989534277056204820', //音遊
        },
        clear_other_emoji: true, // 清除 不是選項的emoji
        clear_options_emoji: false, // 清除 其他選項的emoji
        clear_this_emoji: false, // 清除自身emoji
    } as ReactionHandle,
    "978877062125330472": {
        emoji: {
            '0️⃣': '995717853481287680',
            '1️⃣': '1005871342903623740'
        },
        clear_other_emoji: true, // 清除 不是選項的emoji
        clear_options_emoji: false, // 清除 其他選項的emoji
        clear_this_emoji: false, // 清除自身emoji
    } as ReactionHandle,
    // "1006766692971581511": {
    //     emoji: {// 鴿子家
    //         '0️⃣': '1006173668113662052',
    //     },
    //     clear_other_emoji: true, // 清除 不是選項的emoji
    //     clear_options_emoji: false, // 清除 其他選項的emoji
    //     clear_this_emoji: false, // 清除自身emoji
    // } as ReactionHandle,
    "1015102083957018634": {
        emoji: {// 拓荒
            '1️⃣': "1015101442283024425", // 拓荒1
            '2️⃣': "1015101496355987456", // 拓荒2
            '3️⃣': "1015101500768399373", // 拓荒3
            '4️⃣': "1015101506745282615", // 拓荒4
        },
        clear_other_emoji: false, // 清除 不是選項的emoji
        clear_options_emoji: false, // 清除 其他選項的emoji
        clear_this_emoji: false, // 清除自身emoji
    } as ReactionHandle,
    // "1017348001271906304": {// 臭鴿子
    //     emoji: {
    //         '1️⃣': "1017346767366398022", //輸出
    //         '2️⃣': "1017346838208204840", //輔助
    //     },
    //     clear_other_emoji: false, // 清除 不是選項的emoji
    //     clear_options_emoji: false, // 清除 其他選項的emoji
    //     clear_this_emoji: false, // 清除自身emoji
    // } as ReactionHandle,
    "1019232655256068127": {// CHEGG
        emoji: {
            '0️⃣': "1019232187087863879", //fish
            '1️⃣': "1019235291598442566"// daily-reminder
        },
        clear_other_emoji: true, // 清除 不是選項的emoji
        clear_options_emoji: false, // 清除 其他選項的emoji
        clear_this_emoji: false, // 清除自身emoji
    } as ReactionHandle,
    "1019236672291995698": {
        emoji: {// 拓荒
            '0️⃣': "1019235540341637151", //blue
            '1️⃣': "1019235997474631761", //green
            '2️⃣': "1019236034376110110", //purple
            '3️⃣': "1019236076587593869", //pink
            '4️⃣': "1019236171638906942", //yellow
            '5️⃣': "1019236225581862974", //orange
        },
        clear_other_emoji: false, // 清除 不是選項的emoji
        clear_options_emoji: false, // 清除 其他選項的emoji
        clear_this_emoji: false, // 清除自身emoji
    } as ReactionHandle,

}));



export = {
    name: "getGameRoles",
    message_Id: [...handle_Obj.keys()],
    handle_Obj: handle_Obj,

    async execute(client: ZClient, event: string, reaction: Discord.MessageReaction, user: Discord.User) {
        const member = await dcUtil.getMemberByID(reaction.message.guild, user.id);
        if (this[event]) {
            this[event](client, reaction, member)
        }
    },
    async messageReactionAdd(client: ZClient, reaction: Discord.MessageReaction, member: Discord.GuildMember) {
        let roleId = handle_Obj.get(reaction.message.id).emoji[dcUtil.uniqueEmoji(reaction.emoji)]
        // if (!roleId) return;
        member.roles.add(roleId)
    },
    async messageReactionRemove(client: ZClient, reaction: Discord.MessageReaction, member: Discord.GuildMember) {
        let roleId = handle_Obj.get(reaction.message.id).emoji[dcUtil.uniqueEmoji(reaction.emoji)]
        // if (!roleId) return;
        member.roles.remove(roleId)
    }
};

