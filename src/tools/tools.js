const fs = require('fs');
const path = require("path");

module.exports.loadCommands = async function () {
    loadCommands();
};

function loadCommands() {
    const dirPath = `./src/commands`;
    //const dirPath = [`./src/commands`, `./src/music`];

    return readDirAll(dirPath, (file) => {
        if (file.match(/(\.js|\.ts)$/)) {
            const command = require(file);
            if (command.aliases) {
                command.aliases.forEach(alias => {
                    this.aliases.set(alias, command);
                });
            }

            if (command.name) {
                if (command.listens && command.listens.length > 0) {
                    this.listens.set(command.name, command);
                } else {
                    this.commands.set(command.name, command);
                }
            }
        }
    });
}

function readDirAll(dir, fileHandler, dirHandler) {
    let dirents = fs.readdirSync(dir, { withFileTypes: true });
    /*
    for (let i = 1; i < dirs.length; ++i) {
        dirents.concat(fs.readdirSync(dirs[i], { withFileTypes: true }));
    }*/

    return Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);

        if (dirent.isDirectory()) {
            if (dirHandler) {
                dirHandler(res);
            }

            return readDirAll(res, fileHandler, dirHandler);
        } else {
            if (fileHandler) {
                fileHandler(res);
            }

            return res;
        }
    }));
}