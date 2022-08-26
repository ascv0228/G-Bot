module.exports = {
    name: "clearfish",
    permissions: ['ADMINISTRATOR'],
    async execute(client, msg, args) {
        if (!msg.member.permissions.has(this.permissions[0]))
            return;
        let categoryId = '1005021325519233106'
        let category = await client.channels.fetch(categoryId)
        let chl = category.children
        // console.log(chl)
        // console.log(typeof chl)
        for (let [id, channel] of chl) {
            let testchl = await channel.clone()
            testchl.setParent(categoryId, { lockPermissions: false })
            channel.delete()
            testchl.send('這就是 #' + testchl.name + ' 頻道的起點')
        }
    }
};
