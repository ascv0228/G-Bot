const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "ban",
    aliases: [],
    guilds: [],
    permissions: ['ADMINISTRATOR'],


    async execute(client, msg, args) {
        if (!msg.member.permissions.has(this.permissions[0]))
            return
        if (args.length == 0) return msg.reply('You need tag someone.')
        try {
            msg.guild.members.ban(dcUtil.pickUserId(args[0]))
                .then(user => {
                    console.log(`Banned ${user.username || user.id || user} from ${guild.name}`);
                    msg.channel.send(`Banned ${user.username || user.id || user} from ${guild.name}`);
                })
        }
        catch {
            msg.channel.send(`你無法 ban ${args[0]}`)
        }

    }
};
