
const client = require("../../bot.js");
const { prefix } = require('../../config/config.json');
const rewardUtil = require('../tools/reward-util.js');
const dcUtil = require('../tools/dc-util');
client.on('messageCreate', msg => {
    try {
        if (!msg.guild || !msg.member) return;
        if (!msg.member.user) return;
        if (msg.member.user.bot) return;
    } catch (err) {
        return;
    }
    rewardUtil.confirmReward(client, msg);

    const lines = msg.content.trim().split("\n");
    for (let i = 0; i < lines.length; ++i) {
        if (!lines[i].startsWith(`${prefix}`)) {
            const found = client.noPerfixs_keys.find(v => lines[i].includes(v));
            if (!found) continue;
            const exec = client.noPerfixs.get(found);
            exec.execute(client, msg);
            continue;
        }
        const [cmd, ...args] = lines[i].slice(prefix.length).trimEnd().split(/\s+/);
        const exec = client.commands.get(cmd) || client.aliases.get(cmd);
        if (!exec) continue;
        // if(exec.channel && exec.channel.includes)
        exec.execute(client, msg, args);
        dcUtil.command_embed(client, msg, lines[i]);
    }
});