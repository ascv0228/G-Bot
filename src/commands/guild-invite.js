const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "guild-invite",
    aliases: ["invite"],
    guilds: [],
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        let guild = msg.guild;
        let vanity = await guild.fetchVanityData();
        // if (vanity) return msg.reply(`https://discord.gg/${vanity.code}`);
        if (vanity) msg.reply(`https://discord.gg/${vanity.code}`);

        // if (guild.vanityURLCode) return msg.reply(`https://discord.gg/${vanityURLCode}`);
        // if (guild.vanityURLCode) msg.reply(`https://discord.gg/${vanityURLCode}`);
        const invites = await guild.invites.fetch();
        for (let [code, inv] of invites) {
            // if (inv.maxAge == 0) return msg.reply(`https://discord.gg/${code}`);
            if (inv.maxAge == 0) msg.reply(`https://discord.gg/${code}`);
        }
        const channel = guild.channels.cache
            .filter((channel) => channel.type === 'text')
            .first();

        if (!channel || guild.member(client.user).hasPermission('CREATE_INSTANT_INVITE')) return;
        await channel
            .createInvite({ maxAge: 0, maxUses: 0 })
            .then(async (invite) => {
                invites.push(`${guild.name} - ${invite.url}`); // push invite link and guild name to array
            })
            .catch((error) => console.log(error));
        console.log(invites);

    }
}
