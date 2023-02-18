import Discord from "discord.js";
import path from "path";
import tools from "../utils/tools";
import { ZClient } from "../structure/client";
import { Executor } from "../structure/executor";

function loadCommands(this: ZClient) {
    const dirPath = path.resolve(__dirname, `../commands`);

    return tools.readDirAll(dirPath, (file) => {
        // console.log('fileA: ' + file)
        if (file.match(/(\.js|\.ts)$/)) {
            const command: Executor = require(file);
            if (command.aliases) {
                command.aliases.forEach(alias => {
                    this.aliases.set(alias, command);
                });
            }

            if (command.name) {
                if (command.listens && command.listens.length > 0) {
                    this.listens.set(command.name, command);
                } else if (command.monitorUsers && command.monitorUsers.length > 0) {
                    command.monitorUsers.forEach(userId => {
                        this.monitors.set(userId, command);
                    }); 
                }
                else {
                    this.commands.set(command.name, command);
                }
            }
        }
    });
}

function loadEmbedCommands(this: ZClient) {
    const dirPath = path.resolve(__dirname, `../embedCommands`);

    return tools.readDirAll(dirPath, (file) => {
        if (file.match(/(\.js|\.ts)$/)) {
            const embedCommand: Executor = require(file);
            if (embedCommand.name) {
                this.embedCommands.set(embedCommand.name, embedCommand);
            }
        }
    });
}

function loadEggs(this: ZClient) {
    const dirPath = path.resolve(__dirname, `../eggs`);

    return tools.readDirAll(dirPath, (file) => {
        if (file.match(/(\.js|\.ts)$/)) {
            const egg: Executor = require(file);
            if (egg.name) {
                this.eggs.set(egg.name, egg);
            }
            if (egg.aliases) {
                egg.aliases.forEach(alias => {
                    this.eggs.set(alias, egg);
                });
            }
        }
    });
}

export function install(client: ZClient) {
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    client.listens = new Discord.Collection();
    client.eggs = new Discord.Collection();
    client.monitors = new Discord.Collection();

    client.embedCommands = new Discord.Collection();

    client.loadCommands = loadCommands;
    client.loadEmbedCommands = loadEmbedCommands;
    client.loadEggs = loadEggs;
    client.loadCommands();
    client.loadEmbedCommands();
    client.loadEggs();
}