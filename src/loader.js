const tools = require('./tools/tools.js');

module.exports = {
    loadInteractions: loadInteractions,
    loadCommands: loadCommands,
    loadNoPerfixs: loadNoPerfixs,
    loadReactions: loadReactions,
}


function loadInteractions(dirPath) {
    return tools.readDirAll(dirPath, (file) => {
        if (file.match(/(\.js|\.ts)$/)) {
            const interactions = require(file);

            if (interactions.name) {
                this.interactions.set(interactions.name, interactions);
            }
        }
    });
}


function loadCommands(dirPath) {

    return tools.readDirAll(dirPath, (file) => {
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


function loadNoPerfixs(dirPath) {
    return tools.readDirAll(dirPath, (file) => {
        if (file.match(/(\.js|\.ts)$/)) {
            const noPerfix = require(file);
            if (noPerfix.aliases) {
                noPerfix.aliases.forEach(alias => {
                    this.noPerfixs.set(alias, noPerfix);
                });
            }

            if (noPerfix.name) {
                this.noPerfixs.set(noPerfix.name, noPerfix);
            }
        }
    });
}

function loadReactions(dirPath) {
    return tools.readDirAll(dirPath, (file) => {
        if (file.match(/(\.js|\.ts)$/)) {
            const Reactions = require(file);
            if (Reactions.message_Id) {
                Reactions.message_Id.forEach(message_Id => {
                    if (!message_Id.includes('client.')) {
                        this.reactions.set(message_Id, Reactions);
                    }
                    else {
                        for (let elem of this[message_Id.slice('client.'.length)]) {
                            this.reactions.set(elem, Reactions);
                        }
                    }
                });
            }
        }
    });
}