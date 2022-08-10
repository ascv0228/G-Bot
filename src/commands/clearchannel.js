module.exports = {
    name: "clearchannel",
    permissions: ['ADMINISTRATOR'],
    async execute(client, msg, args) {
        if (!msg.member.permissions.has(this.permissions[0]))
            return;

        let channel = msg.channel
        let category = msg.channel.parent
        console.log(category)

        let cloneChannel = await channel.clone()
        cloneChannel.setParent(category.id, { lockPermissions: false })

        channel.delete()
        cloneChannel.send('這就是 #' + testchl.name + ' 頻道的起點')

    }
};
