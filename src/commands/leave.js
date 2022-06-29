const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "leave",
    aliases: ['leaveserver', 'leaveServer'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        let server = await dcUtil.getGuildByID(client, args[0]);
        server.leave();
    }
};

