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
            if ((d2 - d1) < 300000)
                return msg.reply({ content: '冷卻中' });
            d1 = d2;

        }

        // let str = args.join(" ")
        let start = msg.content.indexOf('g!say');
        let str = msg.content.substr(start, msg.content.length - 1)
        if (str.length == 0)
            return;
        let roleIds = dcUtil.pickAllRoleId(str)
        str = str.replace('@everyone', `@ everyone`);
        str = str.replace('@here', `@ here`);
        if (roleIds == null)
            return msg.delete()
                .then(msg.channel.send({ content: str }));

        console.log(`${roleIds}`)
        for (let roleId of roleIds) {
            let role = await dcUtil.getRoleByID(msg.guild, roleId[1]);
            str = str.replace(roleId[0], `@${role.name}`);
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