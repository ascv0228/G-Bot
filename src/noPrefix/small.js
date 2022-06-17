let d1 = new Date().getTime();

module.exports = {
    name: "@小萌新",
    aliases: ['<@&938748850112430091>'],
    roles: ['948118013293494303'],
    channels: ['832610209377288222', '867811248560144444', '948118924120166410', '987234093748068363'],
    permissions: ['ADMINISTRATOR'],

    execute(client, msg) {
        let flag = msg.member.roles.cache.has('948118013293494303')
        if (!flag) return;
        if (!this.channels.includes(msg.channel.id) &&
            !msg.member.permissions.has(this.permissions[0]))
            return msg.reply({ content: '頻道錯誤' });
        let d2 = new Date();
        if (d2.getHours() < 1 || d2.getHours() > 15)
            return msg.reply({ content: '00:00 ~ 09:00 請勿打擾' });
        d1 = d2.getTime();
        return msg.reply({ content: '<@&938748850112430091>, ' + `${msg.member} 找你` });
    }
};