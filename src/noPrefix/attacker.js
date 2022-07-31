let d1 = new Date().getTime();


module.exports = {
    name: "@輸出",
    aliases: ['<@&987180143275569212>'],
    channels: ['987233571276210217', '987234093748068363'],
    permissions: ['ADMINISTRATOR'],

    execute(client, msg) {
        if (msg.member.permissions.has(this.permissions[0])) return;
        if (!this.channels.includes(msg.channel.id) &&
            !(msg.channel.isThread() && this.channels.includes(msg.channel.parentId)) &&
            !msg.member.permissions.has(this.permissions[0]))
            return msg.reply({ content: '頻道錯誤' });
        return msg.reply({ content: '<@&987180143275569212>, ' + `${msg.member} 找你` });

    }
};