module.exports = {
    name: "clearfish",
    permissions: ['ADMINISTRATOR'],
    async execute(client, msg, args) {
        if (!msg.member.permissions.has(this.permissions[0]))
            return;
        let categoryId = '1005021325519233106'
        let category = await client.channels.fetch(categoryId)
        console.log(categoryId)
        console.log(category)
        let c2 = msg.guild.channels.cache.get(categoryId)
        console.log(c2)
        let c3 = msg.guild.channels.cache.find(channel => channel.type == "GUILD_CATEGORY")
        console.log(c2)
    }
};

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}