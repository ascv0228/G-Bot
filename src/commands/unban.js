const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "unban",
    aliases: [],
    guilds: [],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        if (args.length == 0) return;
        msg.guild.members.unban(dcUtil.pickUserId(args[0]), 'N/A')
            .then(user => console.log(`Unbanned ${args[0]} from ${guild.name}`))
            .catch(console.error);
    }
};
