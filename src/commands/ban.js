const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "myban",
    aliases: [],
    guilds: [],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        let guild
        guild.members.ban('84484653687267328')
            .then(user => console.log(`Banned ${user.username || user.id || user} from ${guild.name}`))
            .catch(console.error);
    }
};
