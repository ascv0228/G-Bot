const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const { Permissions } = require('discord.js');
const scheduleUtil = require('../tools/schedule-util.js');

module.exports = {
    name: "activity",
    aliases: ["act"],
    guilds: ['829673608791851038'],
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (this.guilds.length && !this.guilds.includes(msg.guild)) return;
        if (!msg.member.permissions.has(this.permissions[0]))
            return msg.channel.send('You do not have that permission! :x:').then(msg.react('❌'));
        if (msg.channel.id != '869585329072537680')
            return msg.reply('只允許在 <#869585329072537680>');
        if (args.length == 0) {
            return msg.channel.send({ content: `g!${this.name} <month-day-hour-min> <content>` })
        }
        arr = args[0].split('-')
        if (!checkString(arr)) {
            return msg.channel.send({ content: `<month-day-hour-min>` })
        }
        let time_string = schedule_time_string(need_time(...arr))

        const repVoteEmbed = new Discord.MessageEmbed();
        repVoteEmbed.setTitle(`${msg.author.tag} 發起新活動`)
            .setDescription(args.slice(1).join("\n") + `\n\n報名時間於${arr[0]}月${arr[1]}日${arr[2]}時${arr[3]}分(UTC+8)結束`)
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
                client.command_member_role_time.set(id, time_string);
                loadNewActivity(client, id)
                addActivityCommand(client, id, time_string, roleId);
                scheduleUtil.ScheduleJob_ActivityCommand(client, msg.channel, id, time_string)
            });

        categoryId = '841529629290266706' // 綜合討論區
        createActivityChannel(msg, categoryId, roleId)
    }
};

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

async function addActivityCommand(client, msg_id, time_string, roleId) {
    client.Mdbcollection.updateOne({ type: 'ActivityCommand' }, { "$set": { [`msg.${msg_id}`]: `${time_string}|${roleId}` } });
}

function need_time(month, day, hour, min) {
    now = new Date();
    need = new Date(now.getFullYear(), month - 1, day, hour, min);
    return new Date(need - 8 * 60 * 60 * 1000)
}

function schedule_time_string(D) {
    return `0 ${D.getMinutes()} ${D.getHours()} ${D.getDate()} ${D.getMonth() + 1} *`
}

month_day = {
    '1': 31, '2': 29, '3': 31, '4': 30, '5': 31, '6': 30,
    '7': 31, '8': 31, '9': 30, '10': 31, '11': 30, '12': 31,
};

function checkString(arr) {
    return (1 <= arr[0] && arr[0] <= 12 &&
        1 <= arr[1] && arr[1] <= month_day[arr[0]] &&
        0 <= arr[2] && arr[2] <= 59 &&
        0 <= arr[3] && arr[3] <= 59
    )
}
const tools = require('../tools/tools.js');
function loadNewActivity(client, message_Id) {
    let dirPath = `../reactions`;
    tools.readDirAll(dirPath, (file) => {
        if (file.match(/(activity\.js|activity\.ts)$/)) {
            const Reactions = require(file);
            client.reactions.set(message_Id, Reactions);
        }
    });
}