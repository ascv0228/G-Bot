module.exports = {
    name: "clearfish",
    permissions: ['ADMINISTRATOR'],
    async execute(client, msg, args) {
        if (!msg.member.permissions.has(this.permissions[0]))
            return;
        let categoryId = '1005021325519233106'
        let category = await client.channels.fetch(categoryId)
        let chl = category.children
        let ch2 = chl.cache
        console.log(chl)
        console.log(ch2)
    }
};

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}