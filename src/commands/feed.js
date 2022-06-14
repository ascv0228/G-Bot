const dcUtil = require('../tools/dc-util.js');

module.exports = {
    name: "feed",
    member: ['856793573194465300'],

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