module.exports = {
    name: "clear",
    permissions: ['ADMINISTRATOR'],
    async execute(client, msg, args) {
        if (!msg.member.permissions.has(this.permissions[0]))
            return;
        let messages;
        /*
        do {
            messages = await msg.channel.messages.fetch({ force: true })
            console.log(messages.size)
            for (let [msg_id, message] of messages) {
                message.delete()
            }
        }
        while (messages.size >= 2);*/
    }
}