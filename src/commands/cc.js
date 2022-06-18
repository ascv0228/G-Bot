const { prefix } = require('../../config/config.json');
const { token } = require('../../config/token.json');
const Discord = require('discord.js');
const dcUtil = require('../tools/dc-util.js');
const dbUtil = require('../tools/db-util.js');
const { Permissions } = require('discord.js');
module.exports = {
    name: "cc",
    permissions: ['ADMINISTRATOR'],

    async execute(client, msg, args) {
        if (msg.author.id !== '411895879935590411') return;
        console.log(client.command_member_role);
        console.log(client.command_member_role_time);
        let channelID = '883618737700347946'
        let msg_id = '978852872177471518'
        /*
        let channel = await client.channels.fetch(channelID)
        let message = await channel.messages.fetch(msg_id);
        message.react('9️⃣');*/

        // const guildid = '829673608791851038';
        // const roleid = '986888997538246748';
        // // let guild = await client.guilds.cache.get(guildid)
        // msg.guild.members.fetch();
        // // let members = await msg.guild.roles.cache.get(roleid).members.map(m => m.user.tag)
        // // let members = await dcUtil.getRoleByID(msg.guild, roleid).members.map(m => m.user.id);
        // let members = msg.guild.roles.resolve(roleid).members
        // console.log(members)

        const guildid = '829673608791851038';
        const roleid = '986888997538246748';
        let guild = await client.guilds.cache.get(guildid)
        let members = await guild.members.fetch({ force: true })
        let m2 = await members.filter(member => member.roles.cache.get(roleid))
        console.log(members)
        let output = new Array();
        for (const [id, member] of members) {
            output.push(id)
        }
        console.log(output)





    }
};

