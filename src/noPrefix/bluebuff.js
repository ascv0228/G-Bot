


module.exports = {
    name: "@偷抓對面藍buff",
    roles: ['931946175827959819'],
    channels: ['956874346108964864'],
    permissions: ['ADMINISTRATOR'],

    execute(client, msg) {
        let flag = msg.member.roles.cache.has('931946175827959819')
        if (!flag || msg.member.permissions.has(this.permissions[0])) return;
        if (!this.channels.includes(msg.channel.id))
            return msg.reply({ content: '頻道錯誤' });
        return msg.reply({ content: `${msg.member} : ` + '<@&931946175827959819>, 出來嗨' });

    }
};