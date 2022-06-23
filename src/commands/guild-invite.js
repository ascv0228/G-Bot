const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "guild-invite",
    aliases: ["invite"],
    guilds: [],
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        let guild = msg.guild;
        guild.fetchVanityData()
            .then(res => {
                console.log(`Vanity URL: https://discord.gg/${res.code} with ${res.uses} uses`);
            })
            .catch(console.error);
        // if (guild.vanityURLCode) return msg.reply(`https://discord.gg/${vanityURLCode}`);
        // if (guild.vanityURLCode) msg.reply(`https://discord.gg/${vanityURLCode}`);
        const invites = await guild.invites.fetch();
        for (let [code, inv] of invites) {
            // if (inv.maxAge == 0) return msg.reply(`https://discord.gg/${code}`);
            if (inv.maxAge == 0) msg.reply(`https://discord.gg/${code}`);
        }
        guild.createInvite({ maxAge: 0, maxUses: 10 })
            .then(invite => console.log(`Created an invite with a code of ${invite.code}`))
            .catch(console.error);

    }
}
