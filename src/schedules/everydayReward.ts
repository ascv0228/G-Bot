import Discord from "discord.js";
import schedule from 'node-schedule';
import { ZClient } from "../structure/client";
import dbUtil from '../utils/database-util';
import rewardUtil from '../utils/reward-util';


export = {
    name: "everydayReward",

    async execute(client: ZClient) {
        let time_str = `50 59 ${(15 + client.botStatus['timezone']) % 24} * * *`;
        schedule.scheduleJob(time_str, async function () {
            const guildid = '829673608791851038';
            let guild = client.guilds.cache.get(guildid);
            await rewardUtil.giveReward(client);
            await rewardUtil.giveBigReward(client);
            await rewardUtil.give4000Reward(client);
            // await rewardUtil.giveEverydayPoint(client, guild);
            rewardUtil.getRewardText(client, guild);
            rewardUtil.getRecordText(client, guild, ["紀錄區", "867811395474423838", "normal"], ["x!award", ""])
            // rewardUtil.getRecordText(client, guild, ["日常獎勵紀錄區", "886269472158138429", "daily"], [['x!point'], "1"])
            rewardUtil.getRecordText(client, guild, ["佬專用紀錄區", "948120050458574878", "big"], ['x!ticket', ""])
            rewardUtil.give4000RewardText(client, guild);
        });

        schedule.scheduleJob('10 0 16 * * *', async function () {
            dbUtil.dbInitReward(null);
            dbUtil.dbInitCheckMsg(null);

            (client.channels.cache.get('867811395474423838') as Discord.TextBasedChannel).send(`============截止線=============`);
            (client.channels.cache.get('948120050458574878') as Discord.TextBasedChannel).send(`============截止線=============`);
            (client.channels.cache.get('963831403001307167') as Discord.TextBasedChannel).send(`============截止線=============`);

        });
    }
}