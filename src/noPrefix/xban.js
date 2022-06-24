const dcUtil = require('../tools/dc-util.js');
module.exports = {
    name: "x!ban",
    aliases: [],
    member: ["832777502848974920"],
    async execute(client, msg) {
        if (!msg.content.startsWith(`x!ban`)) return;
        if (!this.member.includes(msg.author.id)) return;
        let args = msg.content.slice('x!ban'.length).trimEnd().split(/\s+/);
        let member = await dcUtil.getMemberByTag(msg.guild, args[0]);

        switch (msg.author.id) {
            case this.member[0]:
                return msg.reply({ content: `<@${member.id}>(${member.nickname}) 退出伺服器&刪庫` });
        }

    }
};