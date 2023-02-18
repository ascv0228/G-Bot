import Discord from "discord.js";
import schedule from 'node-schedule';
import { ZClient } from "../structure/client";
import dbUtil from '../utils/database-util';
import rewardUtil from '../utils/reward-util';
import dataJson from "../data"

export = {
    name: "vf-daily",

    async execute(client: ZClient) {
        let time_str = `0 0 ${(0 + client.botStatus['timezone']) % 24} * * *`;
        schedule.scheduleJob(time_str, async function () {
            client.botStatus['daily'] = false;

            let channelID = dataJson["channel"]["botStatus_main"]
            let msg_id = dataJson["msg_id"]["VfDaily"]
            let channel = await client.channels.fetch(channelID) as Discord.TextChannel
            let message = await channel.messages.fetch(msg_id);
            message.edit('`釣魚機器人` 狀態: 未完成 (❌)')
        });

        const rule = new schedule.RecurrenceRule();
        rule.hour = [6, 12, 18];
        rule.minute = 0;
        rule.tz = 'Etc/UTC';
        schedule.scheduleJob(rule, async function () {
            if (client.botStatus['daily']) return;
            let channels = [dataJson["channel"]['vfDailyReminder']]

            for (let channelId of channels) {
                let channel = await client.channels.fetch(channelId) as Discord.TextChannel;
                channel.send(`<@${dataJson['user']['me']}> 記得完成vf-daily`);
            }
        });

        time_str = `0 0 ${(4 + client.botStatus['timezone']) % 24} * * *`;
        schedule.scheduleJob(time_str, async function () {
            let channelID = dataJson["channel"]['vfDailyReminder']
            let channel = await client.channels.fetch(channelID) as Discord.TextChannel
            channel.send("<@&1019235291598442566>, Virtual Fisher Daily");
        })
    }
}