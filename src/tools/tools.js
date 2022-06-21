const fs = require('fs');
const path = require("path");

module.exports = { readDirAll, readDirAll };

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