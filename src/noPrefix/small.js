module.exports = {
    name: "@小萌新",
    roles: ['948118013293494303'],

    execute(client, msg) {
        let flag = msg.member.roles.cache.has('948118013293494303')
        if (flag)
            msg.reply({ content: '<@&938748850112430091>' });
        return;
    }
};