// import Discord from "discord.js";
// import tools from "../../utils/tools";
// import { ZClient } from "../../structure/client";
// import { CmdType } from "../../utils/types";

// export = {
//     name: "voteAA",
//     description: "create a vote",
//     type: Discord.ApplicationCommandType.ChatInput,
//     options: [
//         {
//             name: "title",
//             description: "title of the vote",
//             type: Discord.ApplicationCommandOptionType.String,
//             required: true,
//         },
//         {
//             name: "optionsNum",
//             description: "number of vote's options",
//             type: Discord.ApplicationCommandOptionType.String,
//             required: true,
//         },
//     ],

//     async execute(client: ZClient, interaction: Discord.CommandInteraction, args: string[]) {
//         if (parseInt(interaction.options.get("optionsNum").value as string) > 11) {
//             interaction.reply({ content: 'The maximun number of options is 11', ephemeral: true });

//             tools.sleep(3000);
//         }
//         createModal(interaction);
//     },
// };


// async function createModal(interaction: Discord.CommandInteraction) {
//     const modal = new Discord.ModalBuilder()
//         .setCustomId(`vote modal###${interaction.member.user.id}`)
//         .setTitle(interaction.options.get("title").value as string);

//     // Add components to modal

//     for (let n = 0; n < parseInt(interaction.options.get("optionsNum").value as string) && n < 11; ++n) {
//         const InputBlock = new Discord.ActionRowBuilder().
//             addComponents(
//                 new Discord.TextInputBuilder()
//                     .setCustomId(`vote option ${n}`)
//                     .setLabel(`What's option ${n + 1} of this vote?`)
//                     .setStyle(Discord.TextInputStyle.Short)
//                     .setPlaceholder(`What's option ${n + 1} of this vote?`)
//                     .setRequired(true)

//             )

//         modal.addComponents(InputBlock as any)

//     }

//     // Show the modal to the user
//     await interaction.showModal(modal);
// }