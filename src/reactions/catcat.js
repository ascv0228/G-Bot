const dcUtil = require('../tools/dc-util.js');
module.exports = {
    name: "catcat",
    message_Id: ["991257219356168242"],
    members: ['411895879935590411', '832777502848974920'],

    async execute(client, event, reaction, user) {
        if (!(this.members.includes(user.id))) return;
        switch (event) {
            case 'messageReactionAdd':
                if (reaction.emoji.name == '✅') {
                    client.catOpen = true
                }
                else {
                    client.catOpen = false
                }
                catcat(client, reaction.message)
                reaction.users.remove(user.id);

        }
    }
};

async function catcat(client, msg) {
    // https://discord.com/channels/988795992667193395/991256310563733564/991257219356168242
    await msg.edit({ content: '`臭貓貓` 狀態: ' + (client.catOpen ? '開 (✅)' : '關 (❌)') });
    let guild = await client.guilds.cache.get('829673608791851038');
    let role = await dcUtil.getRoleByID(guild, '988641623384662066');
    role.setMentionable(client.catOpen)
}//.setMentionable(true)