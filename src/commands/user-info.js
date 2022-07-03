const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "user-info",
    aliases: [],
    guilds: [],

    async execute(client, msg, args) {
        let mention = (await dcUtil.getMemberByTag(msg.guild, args[0])) || msg.member;
        let member = msg.member
        console.log(mention.presence)
        const infoEmbed = new Discord.MessageEmbed()
            .setTitle(`${mention.user.tag}使用者資訊`)
            .setThumbnail(mention.displayAvatarURL({ size: 4096, dynamic: true }))
            .addField('暱稱', `${mention.nickname || mention.user.username}`)
            .addField('ID', `${mention.id}`, true)
            // .addField('成員狀態', `${mention.presence ? null : mention.presence.status}`)
            .addField('建立時間', `${mention.user.createdAt.toLocaleString('zh-TW', { timeZone: 'UTC' })}`)
            .addField('加入伺服器時間', `${mention.joinedAt.toLocaleString('zh-TW', { timeZone: 'UTC' })}`)
            .addField('<a:nitro:993077592754229288>加成伺服器時間', `${mention.premiumSince ? "None" : mention.premiumSince.toLocaleString('zh-TW', { timeZone: 'UTC' })}`)
            .addField('伺服器權限', `${mention.permissions.toArray()}`)
            .setFooter({
                text: member.user.tag,
                iconURL: member.displayAvatarURL({ dynamic: true })
            });
        msg.channel.send({ embeds: [infoEmbed] });

        console.log(mention.roles)
        console.log(mention.presence)
        console.log(mention.presence.status)
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
        + `${User_time_TW.toLocaleTimeString('zh-TW')}`


}


