const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "guild-invite",
    aliases: ["invite"],
    guilds: [],
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        let msg = interaction.message;
        let member = interaction.member;

        let guild = await client.guilds.cache.get(args[0]);
        let hasVanity = guild.vanityURLCode;
        if (hasVanity) {
            let vanity = await guild.fetchVanityData();
            return msg.channel.send(`https://discord.gg/${vanity.code}`);
        }

        const invites = await guild.invites.fetch();
        for (let [code, inv] of invites) {
            if (inv.maxAge == 0) return msg.channel.send(`https://discord.gg/${code}`);
        }

        return msg.channel.send({ content: (await dcUtil.createInvite(guild)).url })

    }
}
