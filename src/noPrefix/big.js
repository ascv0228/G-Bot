let d1 = new Date().getTime();


module.exports = {
    name: "@佬",
    roles: ['938748850112430091'],
    channels: ['832610209377288222', '867811248560144444', '948118924120166410'],
    permissions: ['ADMINISTRATOR'],

    execute(client, msg) {
        let flag = msg.member.roles.cache.has('938748850112430091')
        if (!flag || msg.member.permissions.has(this.permissions[0])) return;
        if (!this.channels.includes(msg.channel.id))
            return msg.reply({ content: '頻道錯誤' });
        let d2 = new Date().getTime();
        if ((d2 - d1) < 300000) return msg.reply({ content: '冷卻中' });
        d1 = d2;
        return msg.reply({ content: '<@&948118013293494303>, ' + `${msg.member} 找你` });

    }
};