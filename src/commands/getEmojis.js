const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "getEmojis",
    permissions: ['ge'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        // console.log(client.emojis)
        for (let guildID of client.Guilds) {
            for (let emoji of await ((await dcUtil.getGuildByID(client, guildID)).emojis.fetch({ force: true }))) {
                console.log(emoji)
            }
        }
    }
};

