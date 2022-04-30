

module.exports = {
    name: "@佬",
    roles: ['938748850112430091'],

    execute(client, msg, args) {
        let flag = msg.member.roles.has('938748850112430091')
        if (flag)
            msg.reply({ content: '<@&948118013293494303>' });
        return;
    }
};