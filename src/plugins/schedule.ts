import Discord from "discord.js";
import path from "path";
import tools from "../utils/tools";
import { ZClient } from "../structure/client";
import { Executor } from "../structure/executor";

function loadSchedules(this: ZClient) {
    const dirPath = path.resolve(__dirname, `../schedules`);

    return tools.readDirAll(dirPath, (file) => {
        if (file.match(/(\.js|\.ts)$/)) {
            const schedule: Executor = require(file);

            if (schedule.name) {
                this.schedules.set(schedule.name, schedule);
            }
        }
    });
}


export function install(client: ZClient) {
    client.schedules = new Discord.Collection();

    client.loadSchedules = loadSchedules;
    client.loadSchedules();
}