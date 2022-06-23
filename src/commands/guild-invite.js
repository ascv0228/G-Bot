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
        let vanity = await guild.fetchVanityData();
        // if (vanity) return msg.reply(`https://discord.gg/${vanity.code}`);
        // if (vanity) msg.reply(`https://discord.gg/${vanity.code}`);

        // const invites = await guild.invites.fetch();
        // for (let [code, inv] of invites) {
        //     if (inv.maxAge == 0) msg.reply(`https://discord.gg/${code}`);
        // }
        let channel = guild.systemChannel
        let channelID = guild.systemChannelId
        console.log(channel)
        console.log(channelID)

        if (!channel) return;
        await channel.createInvite({ maxAge: 0, maxUses: 0 })
            .then(async (invite) => {
                invites.push(`${guild.name} - ${invite.url}`); // push invite link and guild name to array
            })
            .catch((error) => console.log(error));
        console.log(invites);

    }
}
