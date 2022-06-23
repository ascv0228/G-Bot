const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "guild-invite",
    aliases: ["invite"],
    guilds: [],
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        let guild = msg.guild;
        // if (guild.vanityURLCode) return msg.reply(`https://discord.gg/${vanityURLCode}`);
        const invites = await guild.invites.fetch();

        const codeUses = new Map();
        invites.each(inv => codeUses.set(inv.code, inv.uses));
        console.log(codeUses)

        guild.invites.fetch()
            .then(invites => {
                console.log("INVITES CACHED");
                const codeUses = new Map();
                invites.each(inv => codeUses.set(inv.code, inv.uses));

                guildInvites.set(guild.id, codeUses);
            })
            .catch(err => {
                console.log("OnReady Error:", err)
            })

    }
}
