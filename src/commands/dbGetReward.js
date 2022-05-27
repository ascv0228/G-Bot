
const RewardUtil = require('../tools/reward-util.js');

module.exports = {
    name: "dbGetReward",
    aliases: ["dbGR"],

    execute(client, msg, args) {
        if (!msg.member.permissions.has('ADMINISTRATOR'))
            return;
        RewardUtil.getRewardText(client, guild);
        RewardUtil.getRecordText(client, guild, ["記錄區", "867811395474423838", "normal"])
        RewardUtil.getRecordText(client, guild, ["日常獎勵記錄區", "886269472158138429", "daily"])
        RewardUtil.getRecordText(client, guild, ["佬專用紀錄區", "948120050458574878", "big"])
        return;
    }
};





