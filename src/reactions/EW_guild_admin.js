module.exports = {
    name: "EW_guild_admin",
    message_Id: ['988964977224318986'],

    async execute(client, event, reaction, user) {
        if (reaction.emoji.name != '✅') return;
        let admin_role_id = '987326459402145852';
        let EW_guild = await client.guilds.cache.get('856793573194465300');
        const member = EW_guild.members.fetch({ user: user.id });

        switch (event) {
            case 'messageReactionAdd':
                member.roles.add(admin_role_id)
                break;
            case 'messageReactionRemove':
                member.roles.remove(admin_role_id)
                break;

        }
    }
};