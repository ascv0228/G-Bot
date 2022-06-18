
const RewardUtil = require('../tools/reward-util.js');
const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "dbGetReward",
    aliases: ["dbGR"],
    guilds: ['829673608791851038', '864925734581043280'],
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (this.guilds.length && !this.guilds.includes(msg.guild)) return;
        if (!msg.member.permissions.has(this.permissions[0])) return;

        const guildid = '829673608791851038';
        let guild = dcUtil.getGuildByID(client, guildid);
        RewardUtil.getRewardText(client, guild);
        RewardUtil.getRecordText(client, guild, ["記錄區", "867811395474423838", "normal"])
        RewardUtil.getRecordText(client, guild, ["日常獎勵記錄區", "886269472158138429", "daily"])
        RewardUtil.getRecordText(client, guild, ["佬專用紀錄區", "948120050458574878", "big"])
        return;
    }
};





