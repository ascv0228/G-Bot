const dcUtil = require('../tools/dc-util.js');


module.exports = {
    name: "notGroupMemberWantToPvE",
    message_Id: ["1000625595199266946"],
    memberRoles:
    {
        "1000625595199266946": {
            'w_turtle': "1000623130060017784", //我還想要協同
        }
    },

    async execute(client, event, reaction, user) {
        if (!(reaction.emoji.name in this.memberRoles[reaction.message.id])) return;
        const member = await dcUtil.getMemberByID(reaction.message.guild, user.id);
        switch (event) {
            case 'messageReactionAdd':
                member.roles.add(this.memberRoles[reaction.message.id][reaction.emoji.name])
                break;
            case 'messageReactionRemove':
                member.roles.remove(this.memberRoles[reaction.message.id][reaction.emoji.name])
                break;

        }
    }
};
