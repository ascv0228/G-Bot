const client = require("../../bot.js");

client.on('interactionCreate', async interaction => {
    if (interaction.isSelectMenu() && interaction.customId === 'select') {
        let content = interaction.values[0];
        if (!content.startsWith(`${prefix}`)) return;
        const [cmd, ...args] = content.slice(prefix.length).trimEnd().split(/\s+/);
        let allow_user = args.pop();
        if (allow_user != 'all' && allow_user != interaction.user.id)
            return interaction.reply({ content: 'You cannot use others\' commands.', ephemeral: true });
        const exec = client.interactions.get(cmd);
        if (!exec) return;
        exec.execute(client, interaction, args);
        await interaction.message.delete();
    }
});