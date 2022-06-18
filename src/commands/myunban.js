const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "myunban",
    aliases: [],
    guilds: [],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        if (args.length < 2) {
            console.log(`g!${this.name} <server-id> <tag-user>`)
            return;
        }
        let guild = dcUtil.getGuildByID(client, args[0]);
        if (guild == null) return msg.reply(`Unknown ${args[0]}`)
        guild.members.unban(dcUtil.pickUserId(args[1]), 'N/A')
            .then(user => console.log(`Unbanned ${args[1]} from ${guild.name}`))
            .catch(console.error);
    }
};
