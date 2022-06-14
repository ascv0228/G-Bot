const { prefix } = require('../../config/config.json');
const { token } = require('../../config/token.json');
const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const dbUtil = require('../tools/db-util.js');

module.exports = {
    name: "say",
    permissions: ['ADMINISTRATOR'],
    member: ['411895879935590411', '927937812605595739'],

    async execute(client, msg, args) {
        if (!msg.member.permissions.has(this.permissions[0])
            && !this.member.includes(msg.author.id)) return;
        let str = args.join(" ")
        let roleIds = dcUtil.pickAllRoleId(str)
        if (roleIds == null)
            return msg.delete()
                .then(msg.channel.send({ content: str }));

        for (let roleId of roleIds) {
            let role = dcUtil.getRoleByID(roleId);
            str.replace(`<@&${roleId}>`, `@${role.name}`);
            console.log(`@${role.name}`)
        }
        msg.delete()
            .then(msg.channel.send({ content: str }));


    }
};

/*let regx = /<@&(\d{3})>/g
function pickRoleId(str) {
    const mats = [...str.matchAll(regx)];
    if (mats) {
        return mats;
    }
    return null;
}
let s = "a<@&132>b<@&123>c<@&321>"

for(let i=0; i<pickRoleId(s).length; ++i){
    console.log(pickRoleId(s)[i]);
}
*/ 