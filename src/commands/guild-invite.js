const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "guild-invite",
    aliases: ["invite"],
    guilds: [],
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        let guild = msg.guild;
        console.log(guild)
        console.log(guild.invite)
        // guild.fetchInvites().then(invites => {
        //     invites.forEach(invite => {
        //         msg.channel.send(`${invite}`)
        //     })
        //     console.log(invites)
        // })

    }
}
