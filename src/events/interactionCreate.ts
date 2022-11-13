import Discord from "discord.js";
import auth from "../utils/auth";
import tools from "../utils/tools";
import { ZClient } from "../structure/client";
import { EchoMessage } from "../structure/plugin/message";

export = {
    name: 'interactionCreate',

    async execute(client: ZClient, interaction: Discord.Interaction) {
        if (interaction.user.bot) return;
        if (!interaction.guild) return;
        if (!auth.isAuthGuild(interaction.guild.id)) return;
        switch (interaction.type) {
            // ———————————————[Slash Commands]———————————————
            case Discord.InteractionType.ApplicationCommand:
                slashRun(client, interaction);
                break;

            // ———————————————[Slash Commands Auto complete]———————————————
            // case Discord.InteractionType.ApplicationCommandAutocomplete:
            //     break;

            // ———————————————[Message Component]———————————————
            // case Discord.InteractionType.MessageComponent:
            //     break;

            // ———————————————[Modal Submit]———————————————
            // case Discord.InteractionType.ModalSubmit:
            //     break;
        }
        // ———————————————[Button]———————————————
        if (interaction.isButton()) {
        }
        // ———————————————[Select Menu]———————————————
        if (interaction.isSelectMenu()) {
            let content = interaction.values[0];
            if (!content.startsWith(`${client.prefix}`)) return;
            const [cmd, ...args] = content.slice(client.prefix.length).trimEnd().split(/\s+/);
            let allow_user = args.pop();
            if (allow_user != 'all' && allow_user != interaction.user.id)
                return interaction.reply({ content: 'You cannot use others\' commands.', ephemeral: true });
            const exec = client.interactions.get(cmd);
            if (!exec) return;
            exec.execute(client, interaction, args);
            if (interaction.customId == 'select del') {
                await interaction.message.delete();
            }

        }
        // ———————————————[Context Menu]———————————————
        if (interaction.isContextMenuCommand()) {
            await interaction.deferReply({ ephemeral: false });
            const cmd = client.slashCommands.get(interaction.commandName);
            if (cmd) cmd.execute(client, interaction);
        }
    }
};


async function slashRun(client: ZClient, interaction: Discord.CommandInteraction) {
    await interaction.deferReply({ ephemeral: false }).catch(() => { });

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd)
        return interaction.followUp({ content: "An error has occured " });

    const args = [];

    for (let option of interaction.options.data) {
        if (option.type === Discord.ApplicationCommandOptionType.Subcommand) {
            if (option.name) args.push(option.name);
            option.options?.forEach((x) => {
                if (x.value) args.push(x.value);
            });
        } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
        interaction.user.id
    );

    cmd.execute(client, interaction, args);
}
