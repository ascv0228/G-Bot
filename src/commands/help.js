const { prefix } = require('../../config/config.json');

module.exports = {
    name: "help",
    aliases: ["h"],
    // channels: ["xxxx", "xxxxx"],

    async execute(client, msg, args) {
        if (!msg.content.startsWith(`${prefix}`)) return;
        contentArray = (msg.member.permissions.has('ADMINISTRATOR')) ?
            [
                '`' + 'avatar, avt' + '`' + " : 查看頭像",
                '`' + 'memberavatar, memavt' + '`' + " : 查看伺服器頭像",
                '`' + 'ping' + '`' + " : 顯示延遲"
            ] : [
                '`' + 'avatar, avt' + '`' + " : 查看頭像",
                '`' + 'memberavatar, memavt' + '`' + " : 查看伺服器頭像",
                '`' + 'ping' + '`' + " : 顯示延遲"
            ]
        msg.reply({ content: contentArray.join("\n") });
    }
};