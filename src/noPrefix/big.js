

module.exports = {
    name: "@佬",
    roles: ['938748850112430091'],
    channels: ['832610209377288222', '867811248560144444', '948118924120166410'],

    execute(client, msg) {
        let flag = msg.member.roles.cache.has('938748850112430091')
        if (!flag) return;
        if (!this.channels.includes(msg.channel.id))
            return msg.reply({ content: '頻道錯誤' });
        return msg.reply({ content: '<@&948118013293494303>' + `${msg.member} 找你` });

    }
};