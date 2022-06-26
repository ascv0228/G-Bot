const { prefix } = require('../../config/config.json');

module.exports = {
    name: "help",
    aliases: ["h"],
    // permissions: ['ADMINISTRATOR'],

    execute(client, msg, args) {
        let content;
        if (msg.author.id == '832777502848974920')
            content = catcatHelp();
        else if (msg.member.permissions.has('ADMINISTRATOR')
            && msg.guild == '829673608791851038')
            content = AdminHelp()
        else
            content = BaseHelp()
        msg.reply({ content: content });
        return;
    }
};

function AdminHelp() {
    let contentArray = [
        '`' + 'ban' + '`' + " : ban人",
        '`' + 'activity, act' + '`' + " : 發起活動",
        '`' + 'avatar, avt' + '`' + " : 查看頭像",
        '`' + 'nosex' + '`' + " : 不可以瑟瑟.jpg",
        '`' + 'ping' + '`' + " : 顯示延遲",
        '`' + 'say' + '`' + " : 重複說話 (\\n 可以進行換行)",
    ]
    return contentArray.join("\n")
}

function BaseHelp() {
    let contentArray = [
        '`' + 'avatar, avt' + '`' + " : 查看頭像",
        '`' + 'nosex' + '`' + " : 不可以瑟瑟.jpg",
        '`' + 'ping' + '`' + " : 顯示延遲",
        '`' + 'say' + '`' + " : 重複說話 (\\n 可以進行換行)",
    ]
    return contentArray.join("\n")
}

function catcatHelp() { //'832777502848974920'
    let contentArray = [
        '`' + 'seticon, si' + '`' + " : 更改身分組指定顏色",
        '`' + 'setcolor, sc' + '`' + " : 更改身分組指定顏色",
        '`' + 'setcolorrandom, scr, cr' + '`' + " : 更改身分組隨機顏色",
        '`' + 'avatar, avt' + '`' + " : 查看頭像",
        '`' + 'nosex' + '`' + " : 不可以瑟瑟.jpg",
        '`' + 'ping' + '`' + " : 顯示延遲",
        '`' + 'say' + '`' + " : 重複說話 (\\n 可以進行換行)",
    ]
    return contentArray.join("\n")
}