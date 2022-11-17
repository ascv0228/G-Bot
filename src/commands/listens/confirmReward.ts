import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import imgUtil from '../../utils/img-util';
import rewardUtil from '../../utils/reward-util';
import { RewardChannel, RewardChannelName } from "../../utils/types";
import checkMsgDao from "../../database/checkMsgDao"
import rewardDao from "../../database/rewardDao"
import auth from "../../utils/auth";
import dataJson from "../../data";

export = {
    name: 'confirmReward',
    aliases: [],
    description: '外星群獎勵',
    permissions: [],
    roles: [],
    listens: [RewardChannel.NormalChannel, RewardChannel.SupporterChannel, RewardChannel.DalaoChannel, RewardChannel.NitroChannel],
    hide: true,
    bot: true,

    async execute(client: ZClient, msg: Discord.Message) {
        if (msg.channel.isThread() && msg.channel.parentId == RewardChannel.NitroChannel && msg.channel.ownerId != msg.author.id) return;
        let count = await imgUtil.getNotDupeCountFromMsg(client, msg);
        if (count == 0 || count == NaN) return;
        msg.react(dataJson['emoji']['capoo_cute_pink'])
        if (msg.channel.isThread() && msg.channel.parentId == RewardChannel.NitroChannel && msg.channel.ownerId == msg.author.id) return;
        checkMsgDao.update(msg.channel.id, msg.author.id);
        let originCount: number;
        switch (msg.channel.id) {
            case RewardChannel.NormalChannel:
                let reward = rewardUtil.get4000Reward(msg)
                msg.react(reward == 'NaN' ? dataJson['emoji']['pepe_ugly_cry'] : dataJson['emoji']['w_pepe_good'])
                rewardDao.update('reward-4000-ticket', msg.member.id, `${reward}`);
                break;

            case RewardChannel.SupporterChannel:
                originCount = await rewardDao.getOriginCount('reward-ticket', msg.member.id) as number
                originCount = (originCount == undefined || originCount == NaN) ? 0 : originCount / 2

                count = (count + originCount > 5) ? 5 : count + originCount;
                rewardDao.update('reward-ticket', msg.member.id, `${2 * count}`)
                break;

            case RewardChannel.DalaoChannel:
                originCount = await rewardDao.getOriginCount('reward-big-ticket', msg.member.id) as number
                originCount = (originCount == undefined || originCount == NaN) ? 0 : originCount / 3

                count = (count + originCount > 5) ? 5 : count + originCount;
                rewardDao.update('reward-big-ticket', msg.member.id, `${3 * count}`);
                break;

            case RewardChannel.TestChannel:
                if (auth.isOwnerUser(msg.member)) {
                    console.log(rewardUtil.get4000Reward(msg))
                }

        }

    }

};
