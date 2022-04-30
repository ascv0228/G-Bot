

module.exports = {
    name: "@佬",
    roles: ['938748850112430091'],

    execute(client, msg) {
        let flag = msg.member.roles.cache.has('938748850112430091')
        if (flag)
            msg.reply({ content: '<@&948118013293494303>' });
        return;
    }
};