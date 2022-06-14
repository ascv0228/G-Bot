const dcUtil = require('../tools/dc-util.js');

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

        console.log(`${roleIds}`)
        for (let roleId of roleIds) {
            // console.log(`<@&${roleId}> @${role.name}`)
            let role = await dcUtil.getRoleByID(msg.guild, roleId[1]);
            console.log(roleId[0])
            console.log(role.name)
            str.replace(roleId[0], `@ ${role.name}`);
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