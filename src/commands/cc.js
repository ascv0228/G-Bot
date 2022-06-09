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
        setCommand_member_role(client);

    }
};

async function setCommand_member_role(client) {
    let temp = await client.Mdbcollection.find({ type: 'ActivityCommand' }).toArray();
    console.log(temp)
}

