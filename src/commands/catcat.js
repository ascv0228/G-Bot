module.exports = {
    name: "catcat",
    permissions: ['ADMINISTRATOR'],
    members: ['411895879935590411', '832777502848974920'],

    async execute(client, msg, args) {
        if (!this.members.includes(msg.author.id))
            return;
        client.catOpen = (args[0] != 'open') ? false : true;
    }
}