import Discord from "discord.js";
import schedule from 'node-schedule';
import { ZClient } from "../structure/client";
import dbUtil from '../utils/database-util';
import rewardUtil from '../utils/reward-util';
import scheduleUtil from '../utils/schedule-util';
import db from "../database/db"

export = {
    name: "loadActivityCommand",

    async execute(client: ZClient) {
        let msg_channel_id = '869585329072537680';
        let channel = await client.channels.fetch(msg_channel_id) as Discord.TextChannel
        setActivity_time(client)
            .then(() => {
                for (let [key, value] of client.activity_time) {
                    scheduleUtil.ScheduleJob_ActivityCommand(client, channel, key, value)
                }
            });
    }
};


async function setActivity_time(client: ZClient) {
    let temp = await db.svr.db('G-Bot').collection('Clients').find({ type: 'ActivityCommand' }).toArray();
    if (!temp[0])
        return
    for (let [key, value] of new Map(Object.entries(temp[0].msg)) as Map<string, string>) {
        client.activity_time.set(key, value);
    }
}
