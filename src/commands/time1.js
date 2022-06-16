const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "time1",
    aliases: ["t1"],
    guilds: [],

    async execute(client, msg, args) {
        let member = await dcUtil.getMemberByTag(msg.guild, args[0]) || msg.member;
        console.log(member.joinedAt)
        console.log(member.joinedTimestamp)
    }
};