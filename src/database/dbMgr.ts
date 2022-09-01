import db from "./db";

export default {
    db: db,

    async connectAll(): Promise<void> {
        return Promise.all([db.svr.connect2DB()])
            .then(() => {
                console.log("成功連接至資料庫!");
            });
    },

    async closeAll(): Promise<void> {
        return Promise.all([db.svr.closeDB()])
            .then(() => {
                console.log("已關閉所有連接!");
            });
    },

};