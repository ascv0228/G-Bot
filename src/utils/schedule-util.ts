import Discord, { TextChannel } from "discord.js";
import schedule from 'node-schedule';
import { ZClient } from "../structure/client";
import dbUtil from './database-util';
import rewardUtil from './reward-util';
import db from "../database/db"


export default {
    async ScheduleJob_ActivityCommand(client: ZClient, channel: Discord.TextChannel, msg_id: string, time: string) {

        schedule.scheduleJob(time, async function () {
            channel.messages.fetch(msg_id).then(msg => {
                msg.reactions.removeAll();
                msg.edit({ content: `\n活動已結束\n` });
                msg.reply({ content: "記得刪除頻道及臨時身分組" });
            });
            client.activity_time.delete(msg_id);

            db.svr.db('G-Bot').collection('Clients').updateOne({ type: 'ActivityCommand' }, { $unset: { [`msg.${msg_id}`]: 1 } })
        });
    },
}

