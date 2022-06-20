const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "time1",
    aliases: ["t1"],
    guilds: [],

    async execute(client, msg, args) {
        const threads = (await channel.threads.fetch({ force: true }));
        console.log(threads);
    }
};