const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "user-info",
    aliases: [],
    guilds: [],

    async execute(client, msg, args) {
        let mention = (await dcUtil.getMemberByTag(msg.guild, args[0])) || msg.member;
        let member = msg.member
        // const memberRoles = mention.roles.cache.filter((roles) => roles.id !== msg.guild.id).map((role) => role.toString());
        const memberRoles = mention.roles.cache.map((role) => role.toString());
        memberRoles.pop()
        const infoEmbed = new Discord.MessageEmbed()
            .setTitle(`${mention.user.tag} 使用者資訊`)
            .setThumbnail(mention.displayAvatarURL({ size: 4096, dynamic: true }))
            .addFields(
                { name: '暱稱', value: `${mention.nickname || mention.user.username}`, inline: true },
                { name: 'ID', value: `${mention.id}`, inline: true },
                { name: '成員狀態', value: `${mention.user.presence?.status}`, inline: true }
            )
            .addField(`身分組[${memberRoles.length}]`, `${memberRoles}`)
            .addFields(
                { name: '加入Discord時間', value: `${mention.user.createdAt.toLocaleString('zh-TW', { timeZone: 'UTC' })}`, inline: true },
                { name: '加入伺服器時間', value: `${mention.joinedAt.toLocaleString('zh-TW', { timeZone: 'UTC' })}`, inline: true },
                { name: '<a:nitro:993077592754229288>加成伺服器時間', value: `${mention.premiumSince?.toLocaleString('zh-TW', { timeZone: 'UTC' })}`, inline: true },

            )
            // .addField('加入伺服器時間', `${mention.joinedAt.toLocaleString('zh-TW', { timeZone: 'UTC' })}`)
            // .addField('<a:nitro:993077592754229288>加成伺服器時間', `${mention.premiumSince?.toLocaleString('zh-TW', { timeZone: 'UTC' })}`)
            .addField('伺服器權限', `${permissions_en_zh(mention.permissions.toArray()).join(', ')} `)
            .setFooter({
                text: member.user.tag,
                iconURL: member.displayAvatarURL({ dynamic: true })
            });
        msg.channel.send({ embeds: [infoEmbed] });

        // console.log(mention.roles)
        // console.log(mention.presence)
        // console.log(mention.premiumSince)
        // console.log(mention.presence.status)
        // 入群時間
        // 創建時間
        // 暱稱
        // 頭像
        // 身分組
        // ID
    }
};

function getUserCreateAt_string(user) {
    let User_time_US = user.createdAt
    let User_time_TW = User_time_US + 8 * 60 * 60 * 1000
    let now = new Date();
    return `${User_time_TW.getFullYear()}年${User_time_TW.getMonth() + 1}月${User_time_TW.getDate()} `
        + `${User_time_TW.toLocaleTimeString('zh-TW')} `
}



function permissions_en_zh(p_array) {
    let permissionArray = new Array()
    for (let p of p_array) {
        permissionArray.push(permissionMap[p])
    }
    return permissionArray
}
let permissionMap = {
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
}

