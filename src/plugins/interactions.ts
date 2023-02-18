import Discord from "discord.js";
import path from "path";
import tools from "../utils/tools";
import { ZClient } from "../structure/client";
import { Executor } from "../structure/executor";
import { AppCommand } from "../structure/appcommand";


function loadSlashCommands(this: ZClient) {
    const dirPath = path.resolve(__dirname, `../slashCommand`)
    return tools.readDirAll(dirPath, (file) => {
        if (file.match(/(\.js|\.ts)$/)) {
            const slashCommand: AppCommand = require(file);
            if (!slashCommand || !slashCommand.name)
                return;

            this.slashCommands.set(slashCommand.name, slashCommand);

        }
    });
}
function loadInteractions(this: ZClient) {
    const dirPath = path.resolve(__dirname, `../interactions`)
    return tools.readDirAll(dirPath, (file) => {
        if (file.match(/(\.js|\.ts)$/)) {
            const interaction: AppCommand = require(file);
            if (!interaction || !interaction.name)
                return;

            this.interactions.set(interaction.name, interaction);

        }
    });
}


export function install(client: ZClient) {
    client.slashCommands = new Discord.Collection();
    client.interactions = new Discord.Collection();

    client.loadSlashCommands = loadSlashCommands
    client.loadInteractions = loadInteractions

    client.loadSlashCommands();
    client.loadInteractions();
}

