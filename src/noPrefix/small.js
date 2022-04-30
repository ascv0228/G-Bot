module.exports = {
    name: "@小萌新",
    roles: ['948118013293494303'],
    channels: ['832610209377288222', '867811248560144444', '948118924120166410'],

    execute(client, msg) {
        let flag = msg.member.roles.cache.has('948118013293494303')
        if (!flag) return;
        if (!this.channels.includes(msg.channel.id) &&
            !msg.member.permissions.has(this.permissions[0]))
            return msg.reply({ content: '頻道錯誤' });
        return msg.reply({ content: '<@&938748850112430091>, ' + `${msg.member} 找你` });
    }
};