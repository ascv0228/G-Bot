const dcUtil = require('../tools/dc-util.js');
let d1 = new Date();

module.exports = {
    name: "say",
    permissions: ['ADMINISTRATOR'],
    member: ['411895879935590411', '832777502848974920'],
    substring: ['@everyone', '@here'],
    async execute(client, msg, args) {
        if (!msg.member.permissions.has(this.permissions[0])
            && !this.member.includes(msg.author.id)) {
            let d2 = new Date();
            if ((d2 - d1) < 60000)
                return msg.reply({ content: `冷卻時間剩餘 ${(d2 - d1) / 1000} 秒` });
            d1 = d2;

        }
        if (!this.member.includes(msg.author.id)) {
            if (args[0].startsWith('x!') || args[0].startsWith('z!')) {
                return msg.reply({ content: "欠扁" })
            }
        }
        let str = args.join(" ")
        str = newlines(str)
        if (str.length == 0)
            return;
        let roleIds = dcUtil.pickAllRoleId(str)
        str = str.replace('@everyone', `@ everyone`);
        str = str.replace('@here', `@ here`);
        let msg1;
        let output_function = msg.channel.send;
        if (msg.type === 'REPLY') {
            msg1 = await msg.fetchReference();
            output_function = msg1.reply
        }
        if (msg1) {
            if (roleIds == null)
                return msg.delete()
                    .then(msg1.reply({ content: str }));

            for (let roleId of roleIds) {
                let role = await dcUtil.getRoleByID(msg.guild, roleId[1]);
                str = str.replace(roleId[0], `@${role.name}`);
            }
            msg.delete()
                .then(msg1.reply({ content: str }));
            return
        }
        let channel = msg.channel
        if (roleIds == null)
            return msg.delete()
                .then(channel.send({ content: str }));

        for (let roleId of roleIds) {
            let role = await dcUtil.getRoleByID(msg.guild, roleId[1]);
            str = str.replace(roleId[0], `@${role.name}`);
        }
        msg.delete()
            .then(channel.send({ content: str }));


    }
};

function newlines(str) {
    return str.replace('\\n', `\n`);
}