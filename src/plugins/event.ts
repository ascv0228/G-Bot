import tools from "../utils/tools";
import path from "path";
import { ZClient } from "../structure/client";
import { Executor } from "../structure/executor";

function loadEvents(this: ZClient) {
    const dirPath = path.resolve(__dirname, `../events`);

    return tools.readDirAll(dirPath, (file) => {
        if (file.match(/(\.js|\.ts)$/)) {
            const event: Executor = require(file);
            console.log(file)
            if (event.once) {
                this.once(event.name, (...args) => event.execute(this, ...args));
            } else {
                this.on(event.name, (...args) => event.execute(this, ...args));
            }
        }
    });
}

export function install(client: ZClient) {
    client.loadEvents = loadEvents;
}