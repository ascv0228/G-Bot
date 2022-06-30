const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "guild-invite",
    members: ['411895879935590411'],

    async execute(client, interaction, args) {
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

        if (this.members.includes(member.id))
            return msg.channel.send({ content: (await dcUtil.createInvite(guild, options = { maxAge: 0, maxUses: 0 })).url })
        else
            if (guild.id != '829673608791851038')
                return msg.channel.send({ content: (await dcUtil.createInvite(guild)).url })

        return

    }
}
