const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "leave",
    permissions: ['leaveserver', 'leaveServer'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        let server = dcUtil.getGuildByID(client, args[0]);
        server.leave();
    }
};

