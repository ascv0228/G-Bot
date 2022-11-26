import Discord from "discord.js";
import { ZClient } from "../structure/client";
import { CmdType } from "../utils/types";
import dcUtil from "../utils/discord-util";
import { ReactionHandle } from "../structure/reactionExecutor";
import dataJson from "../data"

let handle_Obj = new Map(Object.entries({
    [dataJson['msg_id']['CatOpen']]: {
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
            users: [dataJson['user']['me'], dataJson['user']['catcatBug']],
        },
        clear_other_emoji: false, // 清除 不是選項的emoji
        clear_options_emoji: false, // 清除 其他選項的emoji
        clear_this_emoji: true, // 清除自身emoji
    } as ReactionHandle,
    [dataJson['msg_id']['CatAdmin']]: {
        something: {
            name: 'catAdmin',
            func: catAdmin
        },
        emoji: {
            '✅': true,
            '❌': false
        },
        unable: {
        },
        enable: {
            users: [dataJson['user']['me'], dataJson['user']['catcatBug']],
        },
        clear_other_emoji: false, // 清除 不是選項的emoji
        clear_options_emoji: false, // 清除 其他選項的emoji
        clear_this_emoji: true, // 清除自身emoji
    } as ReactionHandle,
    [dataJson['msg_id']['MusicPlay']]: {
        something: {
            name: 'musicPlay',
            func: musicPlay
        },
        emoji: {
            '✅': true,
            '❌': false
        },
        unable: {
        },
        enable: {
            users: [dataJson['user']['me']],
        },
        clear_other_emoji: false, // 清除 不是選項的emoji
        clear_options_emoji: false, // 清除 其他選項的emoji
        clear_this_emoji: true, // 清除自身emoji
    } as ReactionHandle,
    [dataJson['msg_id']['MentionsEgg']]: {
        something: {
            name: 'mentionsEgg',
            func: mentionsEgg
        },
        emoji: {
            '✅': true,
            '❌': false
        },
        unable: {
        },
        enable: {
            users: [dataJson['user']['me']],
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

    async messageReactionAdd(client: ZClient, reaction: Discord.MessageReaction, member: Discord.GuildMember) {
        let handle = handle_Obj.get(reaction.message.id)
        client.botStatus[handle.something['name']] = handle.emoji[dcUtil.uniqueEmoji(reaction.emoji)]
        if (handle.something['func']) {
            handle.something['func'](client, reaction)
        }
    },
    async execute(client: ZClient, event: string, reaction: Discord.MessageReaction, user: Discord.User) {
        const member = await dcUtil.getMemberByID(reaction.message.guild, user.id);
        if (this[event]) {
            this[event](client, reaction, member)
        }
    },
};

async function catcat(client: ZClient, reaction: Discord.MessageReaction) {
    // https://discord.com/channels/988795992667193395/991256310563733564/991257219356168242
    await reaction.message.edit({ content: '`臭貓貓` 狀態: ' + (client.botStatus['catOpen'] ? '開 (✅)' : '關 (❌)') });
    let guild = client.guilds.cache.get(dataJson['guild']['RD_main']);
    let role = await dcUtil.getRoleByID(guild, dataJson['role']['臭GG']);
    role.setMentionable(client.botStatus['catOpen'])
}//.setMentionable(true)

async function catAdmin(client: ZClient, reaction: Discord.MessageReaction) {
    // https://discord.com/channels/988795992667193395/991256310563733564/991257219356168242
    await reaction.message.edit({ content: '`釣魚伺服器` 領取 **`管理員`** 身分組 : ' + (client.botStatus['catAdmin'] ? '開 (✅)' : '關 (❌)') });

    let guild = await dcUtil.getGuildByID(client, dataJson['guild']['Fisher Grind']);
    let member = await dcUtil.getMemberByID(guild, dataJson['user']['catcatBug']);
    let roleId = dataJson['role']['Fisher Grind Admin']
    if (client.botStatus['catAdmin']) {
        member.roles.add(roleId);
    }
    else {
        member.roles.remove(roleId);
    }

}//.setMentionable(true)

async function musicPlay(client: ZClient, reaction: Discord.MessageReaction) {
    // https://discord.com/channels/988795992667193395/991256310563733564/1017083939212513351
    await reaction.message.edit({ content: '`音樂連播` 狀態: ' + (client.botStatus['musicPlay'] ? '開 (✅)' : '關 (❌)') });

    if (client.botStatus['musicPlay']) return
    for (let [guildId, player] of client.manager.players) {
        let channels = await (await dcUtil.getGuildByID(client, guildId)).channels.fetch();
        let voiceChannel = channels.filter(c => c.type == Discord.ChannelType.GuildVoice).filter(c => !!c.members.get(client.user.id)).values().next().value
        if (voiceChannel.members.size == 1 && voiceChannel.members.get(client.user.id)) {
            setTimeout(() => {
                if (!(voiceChannel.members.size == 1 && voiceChannel.members.get(client.user.id)))
                    return
                if (player) {
                    player.destroy();
                    (voiceChannel as Discord.VoiceChannel).send({ content: `<@${client.user.id}>, 已經離開 <#${voiceChannel.id}>` })
                }
            }, 15000);
        }


    }
}

async function mentionsEgg(client: ZClient, reaction: Discord.MessageReaction) {
    await reaction.message.edit({ content: '`mention彩蛋` 狀態: ' + (client.botStatus['mentionsEgg'] ? '開 (✅)' : '關 (❌)') });
}
