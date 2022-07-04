const client = require("../../bot.js");

client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;
    const exec = client.reactions.get(reaction.message.id);
    if (exec) exec.execute(client, 'messageReactionAdd', reaction, user);
});