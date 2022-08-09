const { prefix } = require('../../config/config.json');
const { token } = require('../../config/token.json');
const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const dbUtil = require('../tools/db-util.js');
const RewardUtil = require('../tools/reward-util.js');
const { Permissions } = require('discord.js');
const scheduleUtil = require('../tools/schedule-util.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: "test",
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        // if (msg.type != 'REPLY') return;
        // let msg1 = await msg.fetchReference();
        // console.log(msg1.embeds[0].title);
        // console.log('==================================')
        // const repVoteEmbed = new Discord.MessageEmbed()
        //     .setAuthor(msg1.embeds[0].author)
        //     .setColor(65535)
        //     .setDescription('%verify')
        //     .setImage(msg1.embeds[0].image.url)
        // msg.channel.send({ embeds: [repVoteEmbed] })

        // console.log('msg1.embeds' + `${!!msg1.embeds}`)
        // console.log('msg1.embeds.length' + `${msg1.embeds.length}`)
        // console.log(!(msg1.embeds || msg1.embeds.length != 0))

        // let id = client.users.get("name", "TESTname");
        let u = (await msg.guild.members.fetch({ force: true }))
            .filter(member => member.user.username == args[0]);

        console.log(u)





        // let guild = msg.guild;
        // RewardUtil.getRewardText(client, guild);
        // RewardUtil.getRecordText(client, guild, ["記錄區", "867811395474423838", "normal"], [["x!award", 'x!point'], ""])
        // RewardUtil.getRecordText(client, guild, ["日常獎勵記錄區", "886269472158138429", "daily"], [['x!point'], "1"])
        // RewardUtil.getRecordText(client, guild, ["佬專用紀錄區", "948120050458574878", "big"], [['x!ticket'], ""])
        /*
    permissions: ['ADMINISTRATOR'],
    
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
            .setDescription(args.slice(1).join("\n") + `\n\n限時於${arr[0]}月${arr[1]}日${arr[2]}時${arr[3]}分(UTC+8)結束`)
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
                addActivityCommand(client, id, time_string, roleId);
                scheduleUtil.ScheduleJob_ActivityCommand(client, msg.channel, id, time_string)
            });
    
        categoryId = '841529629290266706' // 綜合討論區
        createActivityChannel(msg, categoryId, roleId)*/


    }
};

/*permissionOverwrites: [
            {
                id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], //Allow permissions
                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] //Deny permissions
            }
        ]*/
/*let repUser = message.mentions.members.first();
if (!repUser) {
    message.channel.send('Please mention the user you want to setup the vote for!').then((declineMsg) => {
        message.react('❌');
        declineMsg.delete({
            timeout: 5000,
        });
    });
    return;
}*/