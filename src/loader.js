const tools = require('./tools/tools.js');

module.exports = {
    loadInteractions: loadInteractions,

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