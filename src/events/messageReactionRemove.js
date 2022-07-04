const client = require("../../bot.js");

client.on('messageReactionRemove', async (reaction, user) => {
    if (user.bot) return;
    const exec = client.reactions.get(reaction.message.id);
    if (exec) exec.execute(client, 'messageReactionRemove', reaction, user);
});