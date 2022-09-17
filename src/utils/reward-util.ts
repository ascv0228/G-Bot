import Discord from "discord.js";
import { ZClient } from "../structure/client";
import imgUtil from './img-util';
import { RewardChannel, RewardChannelName } from "./types";
import db from "../database/db"
import checkMsgDao from "../database/checkMsgDao"
import rewardDao from "../database/rewardDao"

export default {
    async confirmReward(client: ZClient, msg: Discord.Message) {
        if (!Object.values(RewardChannelName).includes(msg.channel.id))
            return;

        // if (!channelList.includes(msg.channel.id)) return;

        let count = await imgUtil.getNotDupeCountFromMsg(client, msg);
        if (count == 0 || count == NaN) return;

        checkMsgDao.update(msg.channel.id, msg.author.id);
        msg.react('844246188492193812')
        if (msg.channel.id == RewardChannel.NormalChannel) { // 4000
            let reward = get4000Reward(msg)
            msg.react(reward == 'NaN' ? '995540046117609492' : '858466486011035668')
            rewardDao.update('reward-4000-ticket', msg.member.id, `${reward}`);
        }
        if (msg.channel.id == RewardChannel.SupporterChannel) {
            let originCount = await rewardDao.getOriginCount('reward-ticket', msg.member.id) as number
            originCount = (originCount == undefined || originCount == NaN) ? 0 : originCount / 2

            count = (count + originCount > 5) ? 5 : count + originCount;
            rewardDao.update('reward-ticket', msg.member.id, `${2 * count}`)
        }
        if (msg.channel.id == RewardChannel.DalaoChannel) {
            let originCount = await rewardDao.getOriginCount('reward-big-ticket', msg.member.id) as number
            originCount = (originCount == undefined || originCount == NaN) ? 0 : originCount / 3

            count = (count + originCount > 5) ? 5 : count + originCount;
            rewardDao.update('reward-big-ticket', msg.member.id, `${3 * count}`);
        }

    },

    async getRewardText(client: ZClient, guild: Discord.Guild) {

        let temp = await rewardDao.findAll('reward-ticket');
        var nowDate = new Date().getTime();
        nowDate += (8 * 60 * 60 * 1000);
        var date = new Date(nowDate)
        let output = [`==========${date.getMonth() + 1}/${date.getDate()} 輔助獎勵區==========\n`];
        let user_ids = new Array();
        let tickets = new Array();

        temp.forEach((value, key) => {
            user_ids.push(key);
            tickets.push(value);
        });

        let members = await guild.members.fetch({ user: user_ids, withPresences: true })

        let order_userTag = new Map();

        for (const [id, member] of members) {
            let userTag = `@${member.user.username}#${member.user.discriminator}`;
            order_userTag.set(id, userTag);
        }
        for (let i in user_ids) {
            // console.log(user_ids[i]);
            output.push(`x!ticket ${order_userTag.get(user_ids[i])} ${tickets[i]}`);
        }

        let file_name = `${date.getMonth() + 1}-${date.getDate()}(support).txt`
        const attachment = new Discord.AttachmentBuilder(Buffer.from(output.join('\n')), { name: file_name });
        let channel = client.channels.cache.get(SendChannel['gbot-草稿'].id) as Discord.TextChannel;
        channel.send({ files: [attachment] });
        channel.send({ content: file_name + '```' + output.join('\n') + '```' });
    },

    async getRecordText(client: ZClient, guild: Discord.Guild, args: string[], prefix_suffix: string[]) {
        // var nowDate = new Date().getTime();
        // nowDate += (8 * 60 * 60 * 1000);
        var date = new Date(new Date().getTime() + (8 * 60 * 60 * 1000))
        let output_prefix = [`==========${date.getMonth() + 1}/${date.getDate()} ${args[0]}==========\n`];
        let output = await getRecordOutputArray(client, guild, args, prefix_suffix);
        let file_name = `${date.getMonth() + 1}-${date.getDate()}(${args[2]}).txt`
        const attachment = new Discord.AttachmentBuilder(Buffer.from((output_prefix.concat(output)).join('\n')), { name: file_name });

        let channel = client.channels.cache.get(SendChannel['gbot-草稿'].id) as Discord.TextChannel;
        channel.send({ files: [attachment] });
        for (let i = 0; i < output.length / 75; ++i) {
            channel.send({ content: file_name + '```' + (output_prefix.concat(output.slice(i * 75, (i + 1) * 75 - 1))).join('\n') + '```' });
        }
        // client.channels.cache.get(sendChannel).send({ content: file_name + '```' + (output_prefix.concat(output)).join('\n') + '```' });
    },

    async giveReward(client: ZClient) {
        var d = new Date();
        let temp = await rewardDao.findAll('reward-ticket')
        let channel = await client.channels.fetch(SendChannel['gbot-log'].id) as Discord.TextChannel;// 機器人log
        let channel2 = await client.channels.fetch(SendChannel['秘書櫃台'].id) as Discord.TextChannel; // 秘書log
        let rewardType = RewardChannel.SupporterChannel
        channel.send(`==========${d.getMonth() + 1}/${d.getDate()} ${RewardChannelName[rewardType]}==========`);
        channel2.send(`==========${d.getMonth() + 1}/${d.getDate()} <#${rewardType}> 獎勵==========`);
        temp.forEach((value, key) => {
            channel.send(`x!bot-ticket <@${key}> ${value}`);
            channel2.send(`<@${key}>, 已發 <#${rewardType}> 獎勵`);
        });
    },

    async giveBigReward(client: ZClient) {
        var d = new Date();
        let temp = await rewardDao.findAll('reward-big-ticket')
        let channel = await client.channels.fetch(SendChannel['gbot-log'].id) as Discord.TextChannel;// 機器人log
        let channel2 = await client.channels.fetch(SendChannel['秘書櫃台'].id) as Discord.TextChannel; // 秘書log
        let rewardType = RewardChannel.DalaoChannel
        channel.send(`==========${d.getMonth() + 1}/${d.getDate()} ${RewardChannelName[rewardType]}==========`);
        channel2.send(`==========${d.getMonth() + 1}/${d.getDate()} <#${rewardType}> 獎勵==========`);
        temp.forEach((value, key) => {
            channel.send(`x!bot-ticket <@${key}> ${value}`);
            channel2.send(`<@${key}>, 已發 <#${rewardType}> 獎勵`);
        });
    },

    async give4000Reward(client: ZClient) {
        var d = new Date();
        let temp = await rewardDao.findAll('reward-4000-ticket')
        let channel = await client.channels.fetch(SendChannel['gbot-log'].id) as Discord.TextChannel;// 機器人log
        let channel2 = await client.channels.fetch(SendChannel['秘書櫃台'].id) as Discord.TextChannel; // 秘書log
        let rewardType = RewardChannel.NormalChannel
        channel.send(`==========${d.getMonth() + 1}/${d.getDate()} ${RewardChannelName[rewardType]}==========`);
        channel2.send(`==========${d.getMonth() + 1}/${d.getDate()} <#${rewardType}> 獎勵==========`);
        let NaNOutput = new Array();
        temp.forEach((value, key) => {
            if (value != 'NaN') {
                channel.send(`x!bot-award <@${key}> ${value}`);
                channel2.send(`<@${key}>, 已發 <#${rewardType}> 獎勵`);
            }
            else {
                NaNOutput.push(`<@${key}>, 等待人工獎勵`)
            }
        });
        if (!NaNOutput.length) return
        channel2.send({ content: NaNOutput.join('\n') })
    },

    async give4000RewardText(client: ZClient, guild: Discord.Guild) {
        var date = new Date(new Date().getTime() + (8 * 60 * 60 * 1000))
        let output_prefix = [`==========${date.getMonth() + 1}/${date.getDate()} 紀錄區獎勵(money)==========\n`];
        let user_ids = await checkMsgDao.findAll(RewardChannel.NormalChannel);

        let output = new Array();
        let temp2 = (await rewardDao.getString('reward-4000-ticket'))[0]['msg'];
        let members = await guild.members.fetch({ user: user_ids, force: true })
        let order_userTag = new Map();
        for (const [id, member] of members) {
            let userTag = `@${member.user.username}#${member.user.discriminator}`;
            // console.log(userTag)
            order_userTag.set(id, userTag);
        }
        for (let id of user_ids) {
            if (temp2[`${id}`] == 'NaN')
                output.push(`x!award ${order_userTag.get(id)} ${temp2[`${id}`] ?? 'NaN'}`)
        }
        let channel = client.channels.cache.get(SendChannel['gbot-草稿'].id) as Discord.TextChannel;
        for (let i = 0; i < output.length / 75; ++i) {
            channel.send({ content: '```' + (output_prefix.concat(output.slice(i * 75, (i + 1) * 75 - 1))).join('\n') + '```' });
        }
    },
    get4000Reward: get4000Reward,
};
/*
module.exports = {
    confirmReward: confirmReward,
    // everydayScheduleJob: everydayScheduleJob,
    getRewardText: getRewardText,
    getRecordText: getRecordText,
    giveReward: giveReward,
    giveBigReward: giveBigReward,
    giveEverydayPoint: giveEverydayPoint,
    give4000Reward: give4000Reward,
    give4000RewardText: give4000RewardText
};*/

const SendChannel = {
    'gbot-log': {
        'id': '964516826811858984'
    },
    'gbot-草稿': {
        'id': '967986563260772352'
    },
    '秘書櫃台': {
        'id': '867820624215146506'
    },

}







// async function giveEverydayPoint(client: ZClient, guild: Discord.Guild) {
//     var d = new Date();

//     let texts = [['886269472158138429', '每日任務完成區', '2000']]
//     for (let [channel_Id, text, awards] of texts) {
//         let output_text = new Array();
//         output_text.push('```');
//         let temp = await client.Mdbcollection.find({ type: "check-msg", channelId: channel_Id }).toArray();
//         let user_ids: Array<string> = temp[0].users.filter(function (elem, pos) {
//             return temp[0].users.indexOf(elem) == pos;
//         })
//         let members = await guild.members.fetch({ user: user_ids, withPresences: true })


//         let output_channel_1 = await client.channels.fetch(SendChannel['gbot-log'].id) as Discord.TextChannel;// 機器人log
//         let output_channel_2 = await client.channels.fetch(SendChannel['gbot-草稿'].id) as Discord.TextChannel; // 秘書log
//         output_channel_1.send(`==========${d.getMonth() + 1}/${d.getDate()} ${text}==========`);
//         for (const [id, member] of members) {
//             output_channel_1.send(`x!bot-award <@${id}> ${awards}`);
//             output_text.push();
//         }
//         output_text.push('```');
//         output_channel_2.send(output_text.join('\n'));
//     }
// }

// const sendChannel = '967986563260772352'





async function getRecordOutputArray(client: ZClient, guild: Discord.Guild, args: string[], prefix_suffix: string[]) {
    let user_ids = await checkMsgDao.findAll(args[1]);
    // console.log(user_ids);
    let output = new Array();
    // let members = await guild.members.fetch({ user: user_ids, withPresences: true })
    let members = await guild.members.fetch({ force: true })
    let order_userTag = new Map();
    for (const [id, member] of members) {
        let userTag = `@${member.user.username}#${member.user.discriminator}`;
        // console.log(userTag)
        order_userTag.set(id, userTag);
    }
    for (let user_id of user_ids) {
        output.push(`${prefix_suffix[0]} ${order_userTag.get(user_id)} ${prefix_suffix[1]}`);
    }
    // console.log(output)
    return output
}
// async getRecordPointText(client, guild, args)

function pickMoneyId(str: string) {
    if (!str) return null;
    const mats = str.match(/\+?(\d{3,4})/);
    return mats
}

function pickAllMentionId(str: string) {
    if (!str) return null;
    const regexp = /<@!?(\d{15,})>/g;
    const array = [...str.matchAll(regexp)];
    if (array.length) {
        return array;
    }
    return null;
}

function get4000Reward(msg: Discord.Message) {
    let str = msg.content;
    if (!str) return 'NaN'
    if (pickAllMentionId(str)) {
        for (let mat of pickAllMentionId(str))
            str = str.replaceAll(mat[0], '');
    }
    let args = pickMoneyId(str)
    if (!args || !args.length) return 'NaN'
    // console.log(pickMoneyId(str))
    return pickMoneyId(str)[1]
}
