const dcUtil = require('../tools/dc-util.js');
module.exports = {
    name: "x!ban",
    aliases: [],
    member: ['411895879935590411', "832777502848974920"],
    async execute(client, msg) {
        if (!msg.content.startsWith(`x!ban`)) return;
        if (!this.member.includes(msg.author.id)) return;
        let args = msg.content.slice('x!ban'.length).trim().split(/\s+/);
        console.log(args)
        let member = await dcUtil.getMemberByTag(msg.guild, args[0]);
        switch (msg.author.id) {
            case this.member[0]:
            case this.member[1]:
                return msg.reply({ content: `<@${member.id}>(${member.nickname || member.user.username}) 退出伺服器&刪庫` });
        }


    }
};