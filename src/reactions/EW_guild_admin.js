const dcUtil = require('../tools/dc-util.js');

let handle_Obj = new Map(Object.entries({
    '988964977224318986': {
        something: {
            'guild': '856793573194465300',
            'role': '987326459402145852',
            'permissions': {
                'messageReactionAdd': ['ADMINISTRATOR'],
                'messageReactionRemove': []
            }
        },
        emoji: ['✅'],
        unable: {
        },
        enable: {
        },
        clear_other_emoji: true, // 清除 不是選項的emoji
        clear_options_emoji: false, // 清除 其他選項的emoji
        clear_this_emoji: false, // 清除自身emoji
    },

}));

module.exports = {
    name: "EW_guild_admin",
    message_Id: [...handle_Obj.keys()],
    handle_Obj: handle_Obj,

    async execute(client, event, reaction, user) {
        let obj = this.handle_Obj.get(reaction.message.id)
        let role_id = obj.something['role'];
        let guild = client.guilds.cache.get(obj.something['guild']);
        if (!role_id) return;
        let role = await dcUtil.getRoleByID(guild, role_id)

        switch (event) {
            case 'messageReactionAdd':
                role.edit({ permissions: obj.something['permissions'][event] })
                break;
            case 'messageReactionRemove':
                role.edit({ permissions: obj.something['permissions'][event] })
                break;

        }
    }
};