const dcUtil = require('../tools/dc-util.js');
module.exports = {
    name: "activity",
    message_Id: ['client.command_member_role'],
    reaction: ['✅'],

    async execute(client, event, reaction, user) {
        const member = await dcUtil.getMemberByID(reaction.message.guild, user.id);
        if (!this.reaction.includes(reaction.emoji.name)) return;

        switch (event) {
            case 'messageReactionAdd':
                member.roles.add(client.command_member_role.get(reaction.message.id));
                break;
            case 'messageReactionRemove':
                member.roles.remove(client.command_member_role.get(reaction.message.id));
                break;
        }
    }
};

