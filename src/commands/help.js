const { prefix } = require('../../config/config.json');

module.exports = {
    name: "help",
    aliases: ["h"],
    // permissions: ['ADMINISTRATOR'],

    execute(client, msg, args) {
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
        return;
    }
};

function AdminHelp() {
    let L = [
        '`' + 'avatar, avt' + '`' + " : 查看頭像",
        '`' + 'memberavatar, memavt' + '`' + " : 查看伺服器頭像",
        '`' + 'ping' + '`' + " : 顯示延遲"
    ]
    return
}