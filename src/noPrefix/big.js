let d1 = new Date().getTime();


module.exports = {
    name: "@佬",
    aliases: ['<@&948118013293494303>'],
    roles: ['938748850112430091'],
    channels: ['832610209377288222', '867811248560144444', '948118924120166410', '987234093748068363'],
    permissions: ['ADMINISTRATOR'],

    execute(client, msg) {
        let flag = msg.member.roles.cache.has('938748850112430091')
        if (!flag || msg.member.permissions.has(this.permissions[0])) return;
        if (!this.channels.includes(msg.channel.id))
            return msg.reply({ content: '頻道錯誤' });
        let d2 = new Date();
        /*if ((d2.getTime() - d1) < 300000)
            return msg.reply({ content: '冷卻中' });*/
        if (d2.getHours() < 2 || d2.getHours() > 14)
            return msg.reply({ content: '23:00 ~ 10:00 請勿打擾' });
        d1 = d2.getTime();
        return msg.reply({ content: '<@&948118013293494303>, ' + `${msg.member} 找你` });

    }
};