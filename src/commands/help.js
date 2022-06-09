const { prefix } = require('../../config/config.json');

module.exports = {
    name: "help",
    aliases: ["h"],
    // permissions: ['ADMINISTRATOR'],

    execute(client, msg, args) {
        content = (msg.member.permissions.has('ADMINISTRATOR')) ?
            AdminHelp() : BaseHelp()
        msg.reply({ content: content });
        return;
    }
};

function AdminHelp() {
    let contentArray = [
        '`' + 'activity, act' + '`' + " : 發起活動",
        '`' + 'avatar, avt' + '`' + " : 查看頭像",
        '`' + 'memberavatar, memavt' + '`' + " : 查看伺服器頭像",
        '`' + 'ping' + '`' + " : 顯示延遲",
        '`' + 'say' + '`' + " : 重複說話",
    ]
    return contentArray.join("\n")
}

function BaseHelp() {
    let contentArray = [
        '`' + 'avatar, avt' + '`' + " : 查看頭像",
        '`' + 'memberavatar, memavt' + '`' + " : 查看伺服器頭像",
        '`' + 'ping' + '`' + " : 顯示延遲",
    ]
    return contentArray.join("\n")
}