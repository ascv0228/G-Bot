const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "myban",
    aliases: [],
    guilds: [],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        if (args.length < 2) return;
        let guild = await dcUtil.getGuildByID(client, args[0]);
        if (guild == null) return msg.reply(`Unknown ${args[0]}`)
        guild.members.ban(dcUtil.pickUserId(args[1]))
            .then(user => console.log(`Banned ${user.username || user.id || user} from ${guild.name}`))
            .catch(console.error);
    }
};
