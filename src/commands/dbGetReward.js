
const RewardUtil = require('../tools/reward-util.js');

module.exports = {
    name: "dbGetReward",
    aliases: ["dbGR"],

    execute(client, msg, args) {
        if (!msg.member.permissions.has('ADMINISTRATOR'))
            return;
        RewardUtil.getRewardText(client, msg, args);  //輔助獎勵
        RewardUtil.getRecordText(client, ["記錄區", "867811395474423838"])
        RewardUtil.getRecordText(client, ["日常獎勵記錄區", "886269472158138429"])
        RewardUtil.getRecordText(client, ["佬專用紀錄區", "948120050458574878"])
        return;
    }
};









const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
async function getUser(client, id) {

    return new Promise(async (resolve, reject) => {
        let user = await client.users.cache.get(id);

        resolve(user)
    });
}


