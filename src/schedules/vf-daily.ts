import Discord from "discord.js";
import schedule from 'node-schedule';
import { ZClient } from "../structure/client";
import dbUtil from '../utils/database-util';
import rewardUtil from '../utils/reward-util';

export = {
    name: "vf-daily",

    async execute(client: ZClient) {
        schedule.scheduleJob("0 0 */6 * * *", async function () {
            if (client.botStatus['daily']) return;
            let channels = ['966189840603414528', '964528474809323610', '964699991601995787',
                '1014502360422289408', '988805115538456576']

            for (let channelId of channels) {
                let channel = await client.channels.fetch(channelId) as Discord.TextChannel;
                channel.send(`<@${process.env.BOT_OWNER}> 記得完成vf-daily`);
            }
        });
    }
}