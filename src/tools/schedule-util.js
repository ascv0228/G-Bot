const dbUtil = require('./db-util.js');
const schedule = require('node-schedule');


module.exports = {
    everydayScheduleJob: everydayScheduleJob,
    everydayScheduleJob_ActivityCommand: everydayScheduleJob_ActivityCommand,
    ScheduleJob_ActivityCommand: ScheduleJob_ActivityCommand
};


async function everydayScheduleJob(client) {  //https://www.codexpedia.com/javascript/nodejs-cron-schedule-examples/

    // var rule1 = new schedule.RecurrenceRule();
    // rule1.minute = new schedule.Range(0, 59, 5);

    schedule.scheduleJob('50 59 15 * * *', async function () {
        const guildid = '829673608791851038';
        let guild = await client.guilds.cache.get(guildid);
        giveReward(client);
        getRewardText(client, guild);
        getRecordText(client, guild, ["記錄區", "867811395474423838", "normal"])
        getRecordText(client, guild, ["日常獎勵記錄區", "886269472158138429", "daily"])
        getRecordText(client, guild, ["佬專用紀錄區", "948120050458574878", "big"])
    });

    schedule.scheduleJob('10 0 16 * * *', async function () {
        dbUtil.dbInitReward(client, null);
        dbUtil.dbInitCheckMsg(client, null);
        client.channels.cache.get('867811395474423838').send(`============截止線=============`);
        client.channels.cache.get('886269472158138429').send(`============截止線=============`);
        client.channels.cache.get('948120050458574878').send(`============截止線=============`);
        client.channels.cache.get('963831403001307167').send(`============截止線=============`);
    });
}

async function everydayScheduleJob_ActivityCommand(client) {
    console.log('讀取後才進來')
    setCommand_member_role(client);
    let msg_channel_id = '869585329072537680';
    let channel = await client.channels.fetch(msg_channel_id)
    for (let [key, value] of client.command_member_role_time) {
        console.log(key + value)
        ScheduleJob_ActivityCommand(client, channel, key, value)
    }
}

async function ScheduleJob_ActivityCommand(client, channel, msg_id, time) {

    schedule.scheduleJob(time, async function () {
        channel.messages.fetch(msg_id).then(msg => {
            msg.reactions.removeAll();
            msg.edit({ content: `\n活動已結束\n` });
            msg.reply({ content: "記得刪除頻道及臨時身分組" });
        });
        client.command_member_role.delete(msg_id);
        client.command_member_role_time.delete(msg_id);
        client.Mdbcollection.update({ type: 'ActivityCommand' }, { $unset: { [`msg.${msg_id}`]: 1 } })
    });
}

async function setCommand_member_role(client) {
    let temp = await client.Mdbcollection.find({ type: 'ActivityCommand' }).toArray();

    for (let [key, value] of new Map(Object.entries(temp[0].msg))) {
        let args = value.split('|');
        client.command_member_role.set(key, args[1]);
        client.command_member_role_time.set(key, args[0]);
    }
}
