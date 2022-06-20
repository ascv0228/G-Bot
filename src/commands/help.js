const { prefix } = require('../../config/config.json');

module.exports = {
    name: "help",
    aliases: ["h"],
    // permissions: ['ADMINISTRATOR'],

    execute(client, msg, args) {
        content = (msg.member.permissions.has('ADMINISTRATOR')
            && msg.guild == '829673608791851038') ?
            AdminHelp() : BaseHelp()
        msg.reply({ content: content });
        return;
    }
};

function AdminHelp() {
    let contentArray = [
        '`' + 'activity, act' + '`' + " : 發起活動",
        '`' + 'avatar, avt' + '`' + " : 查看頭像",
        '`' + 'nosex' + '`' + " : 不可以瑟瑟.jpg",
        '`' + 'ping' + '`' + " : 顯示延遲",
        '`' + 'say' + '`' + " : 重複說話",
    ]
    return contentArray.join("\n")
}

function BaseHelp() {
    let contentArray = [
        '`' + 'avatar, avt' + '`' + " : 查看頭像",
        '`' + 'nosex' + '`' + " : 不可以瑟瑟.jpg",
        '`' + 'ping' + '`' + " : 顯示延遲",
        '`' + 'say' + '`' + " : 重複說話",
    ]
    return contentArray.join("\n")
}