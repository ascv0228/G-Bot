module.exports = {
    name: "catcat",
    permissions: ['ADMINISTRATOR'],
    members: ['411895879935590411', '832777502848974920'],
    async execute(client, msg, args) {
        let messages;
        do {
            messages = await msg.channel.messages.fetch({ force: true })
            console.log(messages.size)
            for (let [msg_id, message] of messages) {
                message.delete()
            }
        }
        while (messages.size >= 2);
    }
}