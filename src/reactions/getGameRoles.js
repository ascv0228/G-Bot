const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "getGameRoles",
    message_Id: ["978852872177471518", "978877062125330472", "1006766692971581511", "1008302340459221012"],
    memberRoles:
    {
        "978852872177471518": {
            '0️⃣': "853647561024864266", //決勝
            '1️⃣': "931946175827959819", //藍BUFF
            '2️⃣': "977361812343369768", //APEX m
            '3️⃣': "968413297491738635", //打瓦
            '4️⃣': "973560687567720488", //PUBG
            '5️⃣': "938768045646700594", //日麻
            '6️⃣': "967797624621109248", //LOL
            '7️⃣': "960013742777704490", //人偶
            '8️⃣': "978841314546315284", //元氣騎士
            '9️⃣': '983103203744813076', //原神
            '🔟': '989534277056204820', //音遊
        },
        "978877062125330472": {
            '0️⃣': '995717853481287680',
            '1️⃣': '1005871342903623740'
        },
        "1006766692971581511": {  // 鴿子家
            '0️⃣': '1006173668113662052',
        },
        "1008302340459221012": {
            '1️⃣': "1008301351270367262",
            '2️⃣': "1008301519294185562",
            '3️⃣': "1008301692246294609",
            '4️⃣': "1008301743819472956",
        }
    },

    async execute(client, event, reaction, user) {
        if (!(reaction.message.id in this.memberRoles))
            return;
        if (!(reaction.emoji.name in this.memberRoles[reaction.message.id]))
            return;
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
