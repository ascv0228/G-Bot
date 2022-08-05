module.exports = {
    name: "clearfish",
    permissions: ['ADMINISTRATOR'],
    async execute(client, msg, args) {
        if (!msg.member.permissions.has(this.permissions[0]))
            return;
        let categoryId = '1005021325519233106'
        let category = await client.channels.fetch(categoryId)
        console.log(category)
    }
};

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}