
const RewardUtil = require('../tools/reward-util.js');

module.exports = {
    name: "dbGetReward",
    aliases: ["dbGR"],
    guilds: ['829673608791851038', '864925734581043280'],

    async execute(client, msg, args) {
        if (!msg.member.permissions.has('ADMINISTRATOR'))
            return;
        if (!(this.guilds.includes(msg.guild.id)))
            return;
        const guildid = '829673608791851038';
        let guild = await client.guilds.cache.get(guildid);
        RewardUtil.getRewardText(client, guild);
        RewardUtil.getRecordText(client, guild, ["記錄區", "867811395474423838", "normal"])
        RewardUtil.getRecordText(client, guild, ["日常獎勵記錄區", "886269472158138429", "daily"])
        RewardUtil.getRecordText(client, guild, ["佬專用紀錄區", "948120050458574878", "big"])
        return;
    }
};





