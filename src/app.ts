import dotenv from 'dotenv'
dotenv.config()
import Discord from "discord.js";
import fs from "fs";
import dbMgr from "./database/dbMgr";
import tools from "./utils/tools";
import { ZClient } from "./structure/client";
import { Installer } from "./structure/plugin/installer";



const client = new Discord.Client({
    intents: tools.expandEnumValues(Discord.GatewayIntentBits) as number[],
    partials: tools.expandEnumValues(Discord.Partials) as number[]
}) as ZClient;

process.on('uncaughtException', (err, origin) => {
    console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
    tools.Console_Send(client, reason);
});

// console['discord'] = 
const pluginDir = `${__dirname}/plugins`;

fs.readdirSync(pluginDir)
    .filter(file => file.match(/(\.js|\.ts)$/))
    .forEach((file) => {
        const plugin: Installer = require(`${pluginDir}/${file}`);
        plugin.install(client);
    });

dbMgr.connectAll()
    .then(() => {
        console.log("嘗試載入")
        Promise.allSettled([
            // client.loadTasks(),
            // console.log("嘗試載入A"),
            // client.loadCommands(),
            // client.loadEmbedCommands(),
            // client.loadEggs(),
            // client.loadEvents(),
            // client.loadSlashCommands(),
            // client.loadInteractions(),
            // client.loadReactions(),
            // client.loadEmbedReactions(),
            // client.loadSchedules(),
        ]).then((result) => {
            client.login(process.env.BOT_TOKEN);
        });
    })
    .catch(console.error)
    .finally(() => {
        // dbMgr.closeAll();
    });