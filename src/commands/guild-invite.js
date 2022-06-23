const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "guild-invite",
    aliases: ["invite"],
    guilds: [],
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        let guild = msg.guild;
        con
        let vanity = await guild.fetchVanityData();
        // if (vanity) return msg.reply(`https://discord.gg/${vanity.code}`);
        // if (vanity) msg.reply(`https://discord.gg/${vanity.code}`);

        // const invites = await guild.invites.fetch();
        // for (let [code, inv] of invites) {
        //     if (inv.maxAge == 0) msg.reply(`https://discord.gg/${code}`);
        // }
        let channels = await guild.channels.fetch({ force: true });
        console.log(channels);
        const channel = channels.filter((channel) => channel.type === 'text')
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
