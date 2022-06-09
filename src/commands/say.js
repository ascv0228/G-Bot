const { prefix } = require('../../config/config.json');
const { token } = require('../../config/token.json');
const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const dbUtil = require('../tools/db-util.js');

module.exports = {
    name: "say",
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (!msg.member.permissions.has(this.permissions[0])) return
        let str = args.join(" ")
        let roleId = dcUtil.pickUserId(str)
        if (roleId == null)
            return msg.delete()
                .then(msg.channel.send({ content: str }));

        let role = getRoleByID(roleId);
        str.replace(`<@&${roleId}>`, `@${role.name}`);
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