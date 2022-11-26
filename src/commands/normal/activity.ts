import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import scheduleUtil from "../../utils/schedule-util";
import db from "../../database/db"
import tools from "../../utils/tools";
import dataJson from "../../data"

export = {
    roles: [],
    name: "activity",
    aliases: ["act"],
    guilds: [dataJson['guild']['RD_main']],
    channels: [dataJson['channel']['【🎉】自發活動區']],
    description: '建立活動',
    type: [CmdType.Universal],
    permissions: ['Administrator'],
    usage: [`<month-day-hour-min> <content>`],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length == 0) {
            return msg.channel.send({ content: tools.usageString(client, this) })
        }
        let arr = args[0].split('-').map(Number)
        if (!checkString(arr)) {
            return msg.channel.send({ content: tools.usageString(client, this) })
        }
        let time_string = schedule_time_string(need_time(arr))
        const repVoteEmbed = new Discord.EmbedBuilder();
        repVoteEmbed
            .setAuthor({
                name: msg.author.tag,
                iconURL: msg.member.displayAvatarURL({ forceStatic: false })
            })
            .setTitle(`發起新活動`)
            .setDescription(args.slice(1).join(" ").replaceAll('\\n', `\n`) + `\n\n報名時間於${arr[0]}月${arr[1]}日${arr[2]}時${arr[3]}分(UTC+8)結束`)
            .setFooter({
                text: msg.author.tag,
                iconURL: msg.member.displayAvatarURL({ forceStatic: false })
            });

        msg.delete()
        let role = await createRole(msg.guild, "活動參與者");
        let roleId = role.id;
        msg.channel.send({ embeds: [repVoteEmbed], content: `<@&${roleId}> 活動進行中，點選下方貼圖` })
            .then((msg_) => {
                msg_.react(`✅`)
                let id = msg_.id;
                client.activity_time.set(id, time_string);
                addActivityCommand(id, time_string);
                scheduleUtil.ScheduleJob_ActivityCommand(client, msg.channel as Discord.TextChannel, id, time_string)
            });

        let categoryId = dataJson.category['外星-綜合討論區'] // 綜合討論區
        createActivityChannel(msg, categoryId, roleId)
    }
};

async function createRole(guild: Discord.Guild, name: string) {
    return await guild.roles.create({
        name: name,
        color: "Random" as Discord.ColorResolvable,
    })
}

async function createActivityChannel(msg: Discord.Message, categoryId: string, roleId: string) {

    let p = [
        {
            id: msg.guild.id,
            deny: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.ReadMessageHistory
            ],
        },
        {
            id: msg.author.id,
            allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.ReadMessageHistory,
                Discord.PermissionFlagsBits.ManageMessages
            ],
        },
        {
            id: roleId,
            allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.ReadMessageHistory
            ],
        },
    ]
    dcUtil.createTextChannel(msg.guild, "【🎉】活動頻道", categoryId, p)
}

async function addActivityCommand(msg_id: string, time_string: string) {
    db.svr.db('G-Bot').collection('Clients').updateOne(
        { type: 'ActivityCommand' },
        { "$set": { [`msg.${msg_id}`]: `${time_string}` } }
    );
}

function need_time(arr: number[]): Date {
    let [month, day, hour, min] = arr
    let now = new Date();
    let need = new Date(now.getFullYear(), month - 1, day, hour, min).getTime();
    return new Date(need - 8 * 60 * 60 * 1000)
}

function schedule_time_string(D: Date): string {
    return `0 ${D.getMinutes()} ${D.getHours()} ${D.getDate()} ${D.getMonth() + 1} *`
}

let month_day = {
    '1': 31, '2': 29, '3': 31, '4': 30, '5': 31, '6': 30,
    '7': 31, '8': 31, '9': 30, '10': 31, '11': 30, '12': 31,
};

function checkString(arr: number[]): boolean {
    return (1 <= arr[0] && arr[0] <= 12 &&
        1 <= arr[1] && arr[1] <= month_day[arr[0]] &&
        0 <= arr[2] && arr[2] <= 59 &&
        0 <= arr[3] && arr[3] <= 59
    )
}
