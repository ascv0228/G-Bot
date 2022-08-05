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
        console.log(chl.keys())
        console.log(chl.size)
        for (let [id, channel] of chl) {
            console.log(id)
            let testchl = await channel.clone()
            testchl.setParent({ channel: categoryId, lockPermissions: false })

        }
    }
};

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}