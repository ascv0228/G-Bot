const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const { Permissions } = require('discord.js');

module.exports = {
    name: "activity",
    aliases: ["act"],
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (!msg.member.permissions.has(this.permissions[0]))
            return msg.channel.send('You do not have that permission! :x:').then(msg.react('❌'));
        if (args.length == 0) {
            return msg.channel.send({ content: `g!${this.name} <time in minute> <content>` })
        }
        let timeStr = get_time_string()
        const repVoteEmbed = new Discord.MessageEmbed();
        repVoteEmbed.setTitle(`${msg.author.tag} 發起新活動`)
            .setDescription(args.slice(1).join("\n") + `\n\n限時${args[0]}分鐘\n於${timeStr}結束`)
            .setFooter({
                text: msg.author.tag,
                iconURL: msg.member.displayAvatarURL({ dynamic: true })
            });
        msg.delete()
        let role = await createRole(msg.guild, "活動參與者");
        let roleId = role.id;
        msg.channel.send({ embeds: [repVoteEmbed], content: "活動進行中，點選下方貼圖" })
            .then((msg_) => {
                msg_.react(`✅`)
                let id = msg_.id;
                client.command_member_role.set(id, roleId);
                setTimeout(() => {
                    msg.channel.messages.fetch(id).then(msg => {
                        msg.reactions.removeAll();
                        msg.edit({ content: `\n活動已於${timeStr}結束\n` + "記得刪除頻道及臨時身分組" });
                    });
                    client.command_member_role.delete(id);
                }, `${Number(args[0]) * 60 * 1000}`)
            });

        categoryId = '841529629290266706' // 綜合討論區
        createActivityChannel(msg, categoryId, roleId)
    }
};
function get_time_string(min_str) {
    let d1 = new Date().getTime();
    d1 += (8 * 60 * 60 * 1000);
    var date2 = new Date(d1 + (Number(min_str) * 60 * 1000))
    return date2.toString().split(' GMT')[0]
}
async function createRole(guild, name) {
    return await guild.roles.create({
        name: name,
        color: "RANDOM",
    })
}

async function createActivityChannel(msg, categoryId, roleId) {

    p = [
        {
            id: msg.guild.id,
            deny: [
                Permissions.FLAGS.VIEW_CHANNEL,
                Permissions.FLAGS.SEND_MESSAGES,
                Permissions.FLAGS.READ_MESSAGE_HISTORY
            ],
        },
        {
            id: msg.author.id,
            allow: [
                Permissions.FLAGS.VIEW_CHANNEL,
                Permissions.FLAGS.SEND_MESSAGES,
                Permissions.FLAGS.READ_MESSAGE_HISTORY,
                Permissions.FLAGS.MANAGE_MESSAGES
            ],
        },
        {
            id: roleId,
            allow: [
                Permissions.FLAGS.VIEW_CHANNEL,
                Permissions.FLAGS.SEND_MESSAGES,
                Permissions.FLAGS.READ_MESSAGE_HISTORY
            ],
        },
    ]
    dcUtil.createTextChannel(msg.guild, "【🎉】活動頻道", categoryId, p)
}