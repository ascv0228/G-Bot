module.exports = {
    name: "getGameRoles",
    message_Id: ["978852872177471518"],
    memberRoles: {
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

    async execute(client, event, reaction, user) {
        if (!(reaction.emoji.name in client.memberRoles)) return;
        const member = reaction.message.guild.cache.get(user.id);
        switch (event) {
            case 'messageReactionAdd':
                member.roles.add(this.memberRoles[reaction.emoji.name])
                break;
            case 'messageReactionRemove':
                member.roles.remove(this.memberRoles[reaction.emoji.name])
                break;

        }
    }
};

let memberRoles = {
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
}