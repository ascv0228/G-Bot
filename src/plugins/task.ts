import Discord from "discord.js";
import tools from "../utils/tools";
import { ZClient } from "../structure/client";
import { Executor } from "../structure/executor";

function loadTasks(this: ZClient) {
    const dirPath = `./tasks`;

    return tools.readDirAll(dirPath, (file) => {
        if (file.match(/(\.js|\.ts)$/)) {
            const task: Executor = require(file);
            if (task.name && task.interval) {
                this.tasks.set(task.name, task);
            }
        }
    });
}

function runTasks(this: ZClient) {
    this.tasks.forEach((task) => {
        setInterval(task.execute, task.interval, this);
    });
}

export function install(client: ZClient) {
    client.tasks = new Discord.Collection();

    client.loadTasks = loadTasks;
    client.runTasks = runTasks;
}