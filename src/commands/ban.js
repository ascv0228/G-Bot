const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "myban",
    aliases: [],
    guilds: [],
    permissions: ['ADMINISTRATOR'],


    async execute(client, msg, args) {
        if (!msg.member.permissions.has(this.permissions[0]))
            return
        msg.guild.members.ban(dcUtil.pickUserId(args[0]))
            .then(user => console.log(`Banned ${user.username || user.id || user} from ${guild.name}`))
            .catch(console.error);
    }
};
