module.exports = {
    name: "clearfish",
    permissions: ['ADMINISTRATOR'],
    async execute(client, msg, args) {
        let channelName = ''
        if (!msg.member.permissions.has(this.permissions[0]))
            return;
        let categoryId = '1005021325519233106'
        let category = await client.channels.fetch(categoryId)
        let chl = category.children
        for (let [id, channel] of chl) {
            let testchl = await channel.clone()
            testchl.setParent({ channel: categoryId, lockPermissions: false })
            channel.delete()
            testchl.send('這就是 #' + testchl.name + ' 頻道的起點')
            console.log(testchl.name)
            console.log(testchl.partial)
        }
    }
};

