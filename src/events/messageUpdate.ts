import Discord from "discord.js";
import auth from "../utils/auth";
import tools from "../utils/tools";
import dcUtil from "../utils/discord-util";
import listenMsgs from "../utils/listenMsgs";
import { ZClient } from "../structure/client";
import rewardDao from "../database/rewardDao"
import checkMsgDao from "../database/checkMsgDao"
import rewardUtil from '../utils/reward-util';

export = {
    name: 'messageUpdate',

    async execute(client: ZClient, oldMessage: Discord.Message, newMessage: Discord.Message) {
        try {
            if (!newMessage.guild) return;
            if (!newMessage.member) return;
            if (newMessage.member.user.bot) return;
        } catch (err) {
            return;
        }
        if (newMessage.channel.id == '867811395474423838') {
            if (newMessage.attachments.size == 0) return;
            if (!isSameDate(oldMessage.createdTimestamp, newMessage.editedTimestamp)) return;
            if (!(await checkMsgDao.checkInMsg('867811395474423838', newMessage.member.id))) return;

            let reward = rewardUtil.get4000Reward(newMessage);
            newMessage.react(reward == 'NaN' ? '995540046117609492' : '858466486011035668')
            rewardDao.update('reward-4000-ticket', newMessage.member.id, `${reward}`)
            let gbotlogchannel = await client.channels.fetch('964516826811858984') as Discord.TextChannel
            // let gbotlogchannel2 = await client.channels.fetch('994873994597646468') as Discord.TextChannel
            gbotlogchannel.send({ content: '```' + `${newMessage.member.user.tag} 在紀錄區更改文字\n` + `(old) :${oldMessage.content}\n` + `=> (new) :${newMessage.content}` + '```' + newMessage.url })
            // gbotlogchannel2.send({ content: '```' + `${newMessage.member.user.tag} 在紀錄區更改文字\n` + `(old) :${oldMessage.content}\n` + `=> (new) :${newMessage.content}` + '```' + newMessage.url })
        }
    }
}


function isSameDate(oldTimestamp: number, newTimestamp: number) {
    let messageCreateAt_TW = new Date(oldTimestamp + 8 * 60 * 60 * 1000);
    let messageEditAt_TW = new Date(newTimestamp + (8 * 60 * 60 * 1000));
    return (messageCreateAt_TW.toDateString() == messageEditAt_TW.toDateString())
}
