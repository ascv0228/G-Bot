import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import auth from "../../utils/auth";


export = {
    name: "user-info",
    aliases: ['ui'],
    description: '查看使用者資訊',
    permissions: [],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        "",
        "<user>"
    ],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        let mention = args.length && dcUtil.pickUserId(args[0]) ? (await dcUtil.getMemberByTag(msg.guild, args[0])) : msg.member;
        if (msg.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) || auth.isDeveloperUser(msg.member))
            AdminUserInfo(msg, mention);
        else
            BaseUserInfo(msg, mention);
    }
};


function AdminUserInfo(msg: Discord.Message, mention: Discord.GuildMember) {
    const memberRoles = mention.roles.cache.map((role) => role.toString());
    memberRoles.pop()
    const infoEmbed = new Discord.EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`${mention.user.tag} 使用者資訊`)
        .setThumbnail(mention.displayAvatarURL({ size: 4096, forceStatic: false }) || mention.user.displayAvatarURL({ size: 4096, forceStatic: false }))
        .addFields(
            { name: '暱稱', value: `${mention.nickname || mention.user.username}`, inline: true },
            { name: '成員狀態', value: `${mention.presence ? mention.presence.status : "None"}`, inline: true },
            { name: '成員裝置', value: `${mention.presence ? Object.keys(mention.presence.clientStatus) + '⁡' : "None"}`, inline: true },
            { name: 'ID', value: `${mention.id}` },
        )
        .addFields(
            { name: `身分組[${memberRoles.length}]`, value: `${memberRoles}` }
        )
        .addFields(
            { name: '加入Discord時間', value: `${mention.user.createdAt.toLocaleString('zh-TW', { timeZone: 'UTC' })}`, inline: true },
            { name: '加入伺服器時間', value: `${mention.joinedAt.toLocaleString('zh-TW', { timeZone: 'UTC' })}`, inline: true },
            { name: '<a:nitro:993077592754229288>加成伺服器時間', value: `${mention.premiumSince ? mention.premiumSince.toLocaleString('zh-TW', { timeZone: 'UTC' }) : "None"}`, inline: true },
        )
        .addFields(
            { name: '伺服器權限', value: `${permissions_en_zh(mention.permissions.toArray()).join(', ')} ` }
        )
        .setTimestamp()
        .setFooter({
            text: msg.member.user.tag,
            iconURL: msg.member.displayAvatarURL({ forceStatic: false })
        });
    msg.channel.send({ embeds: [infoEmbed] });
}

function BaseUserInfo(msg: Discord.Message, mention: Discord.GuildMember) {
    const memberRoles = mention.roles.cache.map((role) => role.toString());
    memberRoles.pop()
    const infoEmbed = new Discord.EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`${mention.user.tag} 使用者資訊`)
        .setThumbnail(mention.displayAvatarURL({ size: 4096, forceStatic: false }) || mention.user.displayAvatarURL({ size: 4096, forceStatic: false }))
        .addFields(
            { name: '暱稱', value: `${mention.nickname || mention.user.username}`, inline: true },
            { name: '成員狀態', value: `${mention.presence ? mention.presence.status : "None"}`, inline: true }
        )
        .addFields(
            { name: `身分組[${memberRoles.length}]`, value: `${memberRoles}` }
        )
        .addFields(
            { name: '加入Discord時間', value: `${mention.user.createdAt.toLocaleString('zh-TW', { timeZone: 'UTC' })}`, inline: true },
            { name: '加入伺服器時間', value: `${mention.joinedAt.toLocaleString('zh-TW', { timeZone: 'UTC' })}`, inline: true },
            { name: '<a:nitro:993077592754229288>加成伺服器時間', value: `${mention.premiumSince ? mention.premiumSince.toLocaleString('zh-TW', { timeZone: 'UTC' }) : "None"}`, inline: true },
        )
        .setTimestamp()
        .setFooter({
            text: msg.member.user.tag,
            iconURL: msg.member.displayAvatarURL({ forceStatic: false })
        });
    msg.channel.send({ embeds: [infoEmbed] });
}

function permissions_en_zh(p_array: string[]) {
    let permissionArray = new Array()
    for (let p of p_array) {
        permissionArray.push(p in permissionMap ? permissionMap[p] : p)
    }
    return permissionArray
}
let permissionMap = {
    'CREATE_INSTANT_INVITE': '建立臨時邀請',
    'KICK_MEMBERS': '踢出成員',
    'BAN_MEMBERS': '封鎖成員',
    'ADMINISTRATOR': '管理員',
    'MANAGE_CHANNELS': '管理頻道',
    'MANAGE_GUILD': '管理伺服器',
    'ADD_REACTIONS': '增加反應',
    'VIEW_AUDIT_LOG': '查看審核日誌',
    'PRIORITY_SPEAKER': '優先發言',
    'STREAM': '直播',
    'VIEW_CHANNEL': '查看頻道',
    'SEND_MESSAGES': '傳送訊息',
    'SEND_TTS_MESSAGES': '發送語音訊息',
    'MANAGE_MESSAGES': '管理訊息',
    'EMBED_LINKS': '嵌入式連結',
    'ATTACH_FILES': '傳送檔案',
    'READ_MESSAGE_HISTORY': '查看訊息歷史',
    'MENTION_EVERYONE': '提及所有人',
    'USE_EXTERNAL_EMOJIS': '使用外部表情符號',
    'CONNECT': '連線',
    'SPEAK': '說話',
    'MUTE_MEMBERS': '禁言成員',
    'DEAFEN_MEMBERS': '拒聽成員',
    'MOVE_MEMBERS': '移動成員',
    'USE_VAD': '使用按鍵發話',
    'CHANGE_NICKNAME': '更改暱稱',
    'MANAGE_NICKNAMES': '管理暱稱',
    'MANAGE_ROLES': '管理身分組',
    'MANAGE_WEBHOOKS': '管理 Webhooks',
    'MANAGE_EMOJIS_AND_STICKERS': '管理表情符號',
    'USE_APPLICATION_COMMANDS': '使用應用程式命令',

    'REQUEST_TO_SPEAK': '請求發言',
    'MANAGE_EVENTS': '管理活動',
    'MANAGE_THREADS': '管理討論串',
    'USE_PUBLIC_THREADS': '使用公開討論串',
    'CREATE_PUBLIC_THREADS': '建立公開討論串',
    'USE_PRIVATE_THREADS': '使用私人討論串',
    'CREATE_PRIVATE_THREADS': '建立私人討論串',
    'USE_EXTERNAL_STICKERS': '使用外部貼圖',
    'SEND_MESSAGES_IN_THREADS': '在討論串傳送訊息',
    'START_EMBEDDED_ACTIVITIES': '開始嵌入式活動',
    'MODERATE_MEMBERS': '超時成員',


    'CreateInstantInvite': '建立臨時邀請',
    'KickMembers': '踢出成員',
    'BanMembers': '封鎖成員',
    'Administrator': '管理員',
    'ManageChannels': '管理頻道',
    'ManageGuild': '管理伺服器',
    'AddReactions': '增加反應',
    'ViewAuditLog': '查看審核日誌',
    'PrioritySpeaker': '優先發言',
    'Stream': '直播',
    'ViewChannel': '查看頻道',
    'SendMessages': '傳送訊息',
    'SendTTSMessages': '發送語音訊息',
    'ManageMessages': '管理訊息',
    'EmbedLinks': '嵌入式連結',
    'AttachFiles': '傳送檔案',
    'ReadMessageHistory': '查看訊息歷史',
    'MentionEveryone': '提及所有人',
    'UseExternalEmojis': '使用外部表情符號',
    'Connect': '連線',
    'Speak': '說話',
    'MuteMembers': '禁言成員',
    'DeafenMembers': '拒聽成員',
    'MoveMembers': '移動成員',
    'UseVAD': '使用按鍵發話',
    'ChangeNickname': '更改暱稱',
    'ManageNicknames': '管理暱稱',
    'ManageRoles': '管理身分組',
    'ManageWebhooks': '管理 Webhooks',
    'ManageEmojisAndStickers': '管理表情符號和貼圖',
    'UseApplicationCommands': '使用應用程式命令',
    'RequestToSpeak': '請求發言',
    'ManageEvents': '管理活動',
    'ManageThreads': '管理討論串',
    'CreatePublicThreads': '使用公開討論串',
    'CreatePrivateThreads': '建立私人討論串',

    'UseExternalStickers': '使用外部貼圖',
    'SendMessagesInThreads': '在討論串傳送訊息',
    'UseEmbeddedActivities': '使用嵌入式活動',
    'ModerateMembers': '超時成員',
}

