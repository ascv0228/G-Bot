const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "myban",
    aliases: [],
    guilds: [],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        if (args.length < 2) return;
        let guild = client.guilds.cache.get(args[0]);
        guild.members.unban(dcUtil.pickUserId(args[1]))
            .then(user => console.log(`UnBanned ${user.username || user.id || user} from ${guild.name}`))
            .catch(console.error);
    }
};
