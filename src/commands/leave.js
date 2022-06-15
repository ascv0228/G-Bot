
module.exports = {
    name: "leave",
    permissions: ['leaveserver', 'leaveServer'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        let server = client.guilds.cache.get(args[0]);
        server.leave();

    }
};

