import * as erela from "erela.js";
import * as canvas from "canvas-constructor/skia";
import child_process from "child_process";
import Discord from "discord.js";
import fetch from "node-fetch";
import fs from "fs";
import os from "os";
import path from "path";
import zlib from "zlib";
import moment from "../utils/moment";
import config from "./config";
import { MemoryInfo, ProcessInfo } from "../structure/analyzedata";
import { Executor } from "../structure/executor";
import { BindDataCollection } from "../structure/model/binddata";
import { Member, MembersInfo } from "../structure/model/teaminfo";
import { ZClient } from "../structure/client";
import auth from "./auth";
import dataJson from "../data";

export default {
    async sendMultiMessage<T>(
        msg: Discord.Message,
        datas: T[],
        title: string,
        num: number,
        cb: (data: T, index: number, array: T[]) => string | Promise<string>): Promise<void> {

        let counter = 0;
        let rep = title;

        for (let i = 0; i < datas.length; ++i) {
            rep += await cb(datas[i], i, datas);

            ++counter;

            if (counter >= num || i == datas.length - 1) {
                counter = 0;
                await msg.channel.send({ content: rep });
                rep = title;
            }
        }
    },

    async sendEmbedMultiMessage<T>(
        msg: Discord.Message,
        datas: T[],
        title: string,
        num: number,
        cb: (data: T, index: number, array: T[]) => string | Promise<string>, text?: string): Promise<void> {

        let counter = 0;
        let rep = "";

        for (let i = 0; i < datas.length; ++i) {
            rep += await cb(datas[i], i, datas);

            ++counter;

            if (counter >= num || i == datas.length - 1) {
                counter = 0;

                const embed = new Discord.EmbedBuilder()
                    .setTitle(title)
                    .setDescription(rep)
                    .setFooter({
                        text: msg.member.user.tag,
                        iconURL: msg.member.displayAvatarURL({ forceStatic: false })
                    });
                await msg.channel.send({ content: text, embeds: [embed] });
                rep = "";
            }
        }
    },


    async sendPrivateEmbedMultiMessage<T>(
        msg: Discord.Message,
        datas: T[],
        title: string,
        num: number,
        cb: (data: T, index: number, array: T[]) => string | Promise<string>, text?: string): Promise<void> {

        let counter = 0;
        let rep = "";

        for (let i = 0; i < datas.length; ++i) {
            rep += await cb(datas[i], i, datas);

            ++counter;

            if (counter >= num || i == datas.length - 1) {
                counter = 0;

                const embed = new Discord.EmbedBuilder()
                    .setTitle(title)
                    .setDescription(rep)
                    .setFooter({
                        text: msg.member.user.tag,
                        iconURL: msg.member.displayAvatarURL({ forceStatic: false })
                    });
                await msg.member.user.send({ content: text, embeds: [embed] });
                rep = "";
            }
        }
    },

    createEmbedMultiMessage<T>(
        msg: Discord.Message,
        datas: T[],
        title: string,
        num: number,
        cb: (data: T, index: number, array: T[]) => string | Promise<string>): Discord.EmbedBuilder[] {

        const ret = [];

        let counter = 0;
        let rep = "";

        for (let i = 0; i < datas.length; ++i) {
            rep += cb(datas[i], i, datas);

            ++counter;

            if (counter >= num || i == datas.length - 1) {
                const embed = new Discord.EmbedBuilder()
                    .setTitle(title)
                    .setDescription(rep)
                    .setFooter({
                        text: msg.member.user.tag,
                        iconURL: msg.member.displayAvatarURL({ forceStatic: false })
                    });

                ret.push(embed);

                rep = "";
                counter = 0;
            }
        }

        return ret;
    },

    sleep(ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    },

    readJsonData(filePath: string, defaultVal?: any): any {
        if (!fs.existsSync(filePath)) {
            if (defaultVal) {
                fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 4));
            } else {
                return null;
            }
        }

        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    },

    writeJsonData(filePath: string, data: any): void {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    },

    zip(data: Buffer): Promise<string> {
        return new Promise((resolve, reject) => {
            const gzip = zlib.createGzip();
            const zipData = [];

            gzip.on('data', (d) => {
                zipData.push(d);
            }).on('error', (e) => {
                reject(e);
            }).on('end', () => {
                resolve(Buffer.concat(zipData).toString("base64"));
            });

            gzip.write(data);
            gzip.end();
        });
    },

    unzip(str: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {

            const zipData = Buffer.from(str, "base64");

            const gzip = zlib.createGunzip();
            const data = [];

            gzip.on('data', (d) => {
                data.push(d);
            }).on('error', (e) => {
                reject(e);
            }).on('end', () => {
                resolve(Buffer.concat(data));
            });

            gzip.write(zipData);
            gzip.end();
        });
    },

    randInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    readDirAll(dir: string, fileHandler?: (file: string) => void, dirHandler?: (file: string) => void): Promise<any[]> {
        const dirents = fs.readdirSync(dir, { withFileTypes: true });

        return Promise.all(dirents.map((dirent) => {
            const res = path.resolve(dir, dirent.name);

            if (dirent.isDirectory()) {
                if (dirHandler) {
                    dirHandler(res);
                }

                return this.readDirAll(res, fileHandler, dirHandler);
            } else {
                if (fileHandler) {
                    fileHandler(res);
                }

                return res;
            }
        }));
    },

    timeFormat(time: number, isFullDate?: boolean): string {
        let str = "";

        const duration = moment.duration(time);

        str = `${duration.seconds()}s`;

        if (!isFullDate && duration.asMinutes() < 1) return str;

        str = `${duration.minutes()}m:` + str;

        if (!isFullDate && duration.asHours() < 1) return str;

        str = `${duration.hours()}h:` + str;

        if (!isFullDate && duration.asDays() < 1) return str;

        str = `${Math.floor(duration.asDays())}d:` + str;

        return str;
    },

    createBar(player: erela.Player): string {
        const slider = "🔘";
        const line = "▬";
        const size = 20;

        const current = player.queue.current;

        if (!current || !current.duration) {
            return `**[${slider}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
        }

        const duration = current.duration;
        const position = player.position;
        const durationFmt = new Date(duration).toISOString().substring(11, 19);
        const positionFmt = new Date(position).toISOString().substring(11, 19);

        if (current.isStream) {
            return `**[${slider}${line.repeat(size - 1)}]**\n**${positionFmt} / ◉ LIVE**`;
        }

        const total = duration;
        const percent = position / (total || 1) * size;
        const left = percent >= size ? size - 1 : Math.floor(percent);
        const right = size - left - 1;
        const bar = `${line.repeat(left)}${slider}${line.repeat(right)}`;

        return `**[${bar}]**\n**${positionFmt} / ${durationFmt}**`;
    },

    getProcessInfo(): Promise<ProcessInfo[]> {
        return new Promise((resolve, reject) => {
            const totalmem = os.totalmem();
            const max_data = 5;

            const handleProcess = (name: string, pid: string, usage: number): ProcessInfo => {
                const info: ProcessInfo = {
                    name: name,
                    pid: pid,
                    usage: usage,
                    percent: (usage / totalmem * 100).toFixed(2)
                };

                return info;
            };

            const endInstruction = (pss: ProcessInfo[]): void => {
                pss = pss.sort((x, y) => { return y.usage - x.usage; }).slice(0, max_data);
                resolve(pss);
            };

            const instructionSet = {
                win32: {
                    command: "tasklist",
                    callback: (error: child_process.ExecException, stdout: string, stderr: string): void => {
                        const tasklist = stdout.split(/\r?\n/);
                        const pss = [];

                        for (let i = 1; i < tasklist.length; i++) {
                            const ps = tasklist[i].split(/\s+/);
                            const ps_length = ps.length;
                            const ps_name = ps.slice(0, ps_length - 5).join(" ");
                            const ps_data = ps.slice(ps_length - 5);

                            if (ps_data[3]) {
                                const usage = parseInt(ps_data[3].replace(/,/g, "")) * 1024;
                                if (!isNaN(usage)) {
                                    pss.push(handleProcess(ps_name, ps_data[0], usage));
                                }
                            }
                        }

                        endInstruction(pss);
                    },
                },

                default: {
                    command: "ps aux",
                    callback: (error: child_process.ExecException, stdout: string, stderr: string): void => {
                        const tasklist = stdout.split(/\r?\n/);
                        const pss = [];

                        for (let i = 1; i < tasklist.length; i++) {
                            const ps = tasklist[i].split(/\s+/);
                            const ps_name = ps.slice(10).join(" ");
                            const ps_data = ps.slice(0, 10);

                            if (ps_data[3]) {
                                const usage = Math.round(parseFloat(ps_data[3]) / 100 * totalmem);
                                if (!isNaN(usage)) {
                                    pss.push(handleProcess(ps_name, ps_data[1], usage));
                                }
                            }
                        }

                        endInstruction(pss);
                    },
                }
            };

            const instruction = instructionSet[process.platform] || instructionSet.default;
            child_process.exec(instruction.command, instruction.callback);
        });
    },

    getMemoryInfo(): MemoryInfo {
        const totalmem = os.totalmem();
        const freemem = os.freemem();
        const usagemem = totalmem - freemem;

        return {
            total: {
                amount: totalmem,
                amount_mb: (totalmem / 1024 / 1024).toFixed(2),
            },
            usage: {
                amount: usagemem,
                amount_mb: (usagemem / 1024 / 1024).toFixed(2),
                percent: (usagemem / totalmem * 100).toFixed(2),
            },
            free: {
                amount: freemem,
                amount_mb: (freemem / 1024 / 1024).toFixed(2),
                percent: (freemem / totalmem * 100).toFixed(2),
            }
        };
    },

    isObject(o: any): boolean {
        return o instanceof Object && o.constructor === Object;
    },

    getCoolDownConfig(message: Discord.Message, exec: Executor): number {
        let cd: number = null;

        if (exec.cooldown) {
            if (this.isObject(exec.cooldown)) {
                const obj = exec.cooldown;
                for (const perm in obj) {
                    if (perm != "DEFAULT") {
                        const permCD = exec.cooldown[perm] || 0;
                        // if (message.member.permissions.has(Discord.PermissionsBitField.Flags[perm])) {
                        if (message.member.permissions.has(Discord.PermissionsBitField.Flags[perm])) {
                            if (cd == null || permCD < cd) {
                                cd = permCD;
                            }
                        }
                    }
                }
                if (cd == null) {
                    cd = obj.DEFAULT || 0;
                }
            } else {
                cd = exec.cooldown as number;
            }
        }

        return cd;
    },

    getChannelConfig(message: Discord.Message, exec: Executor): string[] {
        let channels: string[] = null;

        if (exec.channels) {
            if (this.isObject(exec.channels)) {
                const obj = exec.channels;
                for (const perm in obj) {
                    if (perm != "DEFAULT") {
                        const permChannels = exec.channels[perm] || [];
                        if (message.member.permissions.has(Discord.PermissionsBitField.Flags[perm])) {
                            if (channels == null || permChannels.length < channels.length) {
                                channels = permChannels;
                            }
                        }
                    }
                }
                if (channels == null) {
                    channels = obj.DEFAULT || [];
                }
            } else {
                channels = exec.channels as string[];
            }
        }

        return channels;
    },

    registerMultiFont(fonts: { [key: string]: string }) {
        for (const name in fonts) {
            const font = fonts[name];
            canvas.registerFont(name, [
                path.resolve(this.resolveFontPath(font))
            ]);
        }
    },

    resolveFontPath(fileName: string) {
        return `resource/font/${fileName}`;
    },

    resolveImagePath(fileName: string) {
        return `resource/image/${fileName}`;
    },

    async getCard(from: string, to: string) {
        this.registerMultiFont(config.ting.fonts);

        const start = moment.tz(config.ting.date, "YYYY-MM-DD", "Asia/Taipei");
        const curr = moment().utcOffset(8);
        const duration = moment.duration(curr.diff(start));
        const days = Math.ceil(duration.asDays());

        const avatar_1 = await canvas.resolveImage(await (await fetch(from)).buffer());
        const avatar_2 = await canvas.resolveImage(await (await fetch(to)).buffer());
        const background = await canvas.resolveImage(this.resolveImagePath(config.ting.background));

        const width = 500;
        const height = 300;
        const avtSize = 60;

        return new canvas.Canvas(width, height)
            .setTextAlign("center")
            .printRoundedImage(background, 0, 0, width, height, 15)
            .setShadowColor("rgba(22, 22, 22, 1)")
            .setShadowOffsetY(5)
            .setShadowBlur(10)

            .printCircularImage(avatar_1, avtSize, avtSize, avtSize - 10)
            .printCircularImage(avatar_2, width - avtSize, avtSize, avtSize - 10)
            .setColor("#FFC1E0")
            .setTextFont("italic 2.5em 'Great Vibes', serif")
            .printText(config.ting.title, width / 2, 70)

            .setColor("#FFBFFF")
            .setTextFont('italic 1.5em "Fira Sans", serif')
            .printText(config.ting.text[0], width / 2, 160)
            .printText(config.ting.text[1], width / 2, 200)
            .printText(config.ting.text[2], width / 2, 240)

            .setTextAlign("left")
            .setColor("#FFBFFF")
            .setTextFont('small-caps 0.9em beauty')
            .printText(`${days} days`, 10, height - 15)

            .setTextAlign("right")
            .setColor("#FFBFFF")
            .setTextFont('small-caps 0.9em beauty')
            .printText(config.ting.date, width - 10, height - 15)

            .toBuffer("png");
    },

    // filtUnBindGuildMembers(members: Discord.Collection<string, Discord.GuildMember>, bindData: BindDataCollection, subscribeList: MembersInfo): Discord.GuildMember[] {
    //     const ret: Discord.GuildMember[] = [];

    //     members.forEach((member) => {
    //         if (member.user.bot || member.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild)) {
    //             return;
    //         }

    //         const crew_usr = bindData[member.id];
    //         if (!crew_usr) {
    //             ret.push(member);
    //             return;
    //         }

    //         const acc = crew_usr.accounts;
    //         if (!acc || acc.length <= 0) {
    //             ret.push(member);
    //             return;
    //         }

    //         const bindid = acc.find((e) => !!subscribeList[e]);
    //         if (!bindid) {
    //             ret.push(member);
    //         }
    //     });

    //     return ret;
    // },

    // filtUnBindCrewMembers(members: Discord.Collection<string, Discord.GuildMember>, bindData: BindDataCollection, subscribeList: MembersInfo): MembersInfo {
    //     const subscribes: MembersInfo = JSON.parse(JSON.stringify(subscribeList));

    //     // 篩選出團隊中所有仍未綁定的遊戲帳號
    //     members.forEach((member) => {
    //         if (member.user.bot) {
    //             return;
    //         }

    //         const bind = bindData[member.id];
    //         if (!bind || !bind.accounts) {
    //             return;
    //         }

    //         bind.accounts.forEach((uuid) => {
    //             // 綁定過且之前綁定的帳號在群內則直接把遊戲內清單移除
    //             if (subscribes[uuid]) {
    //                 delete subscribes[uuid];
    //             }
    //         });
    //     });

    //     return subscribes;
    // },

    // isEnvelopeMessage(message: Discord.Message): boolean {
    //     if (message.author.id == dataJson["bot"]["X_bot"]) {
    //         if (message.components && message.components.length) {
    //             return message.content.includes("紅包") && !!message.components.find(row => {
    //                 return row.components.find(c => c.type == Discord.ComponentType.Button);
    //             });
    //         }
    //     }

    //     return false;
    // },

    strcmp(a: string, b: string): number {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    },

    memberSort(members: Member[]): Member[] {
        return members.sort((x, y) => x.crewid == y.crewid ? y.data.Level - x.data.Level : this.strcmp(x.crewid, y.crewid));
    },

    shuffle<T>(array: T[]) {
        for (let i = array.length - 1; i > 0; --i) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    expandEnumValues(srcData: { [s: string]: string | number }): (string | number)[] {
        return Object.values(srcData).filter((_, i, a) => i < Math.floor(a.length / 2)).map((e) => srcData[e]);
    },

    checkInArrayOrObject(target: any, obj: Object) {
        return Array.isArray(obj) ? obj.includes(target) : target in obj
    },

    fileType(str: string) {
        let found = [
            '.webp', '.png', '.jpg', '.jpeg',
            '.WEBP', '.PNG', '.JPG', '.JPEG',
            '.gif', '.GIF'
        ].find(v => str.endsWith(v));
        if (found) return "圖片";
        found = [
            '.mp4', '.MP4', '.mov', '.MOV',
            '.wmv', '.WMV', '.flv', '.FLV',
            '.avi', '.AVI'
        ].find(v => str.endsWith(v));
        if (found) return "影片";
        return "檔案"

    },

    async messageWithAttachments(message: Discord.Message, OutputChannel: Discord.TextChannel) {
        for (const [_, att] of message.attachments) {
            let attEmbed = new Discord.EmbedBuilder()
                .setTitle(`${message.member.displayName} 傳送 ${this.fileType(att.name)}`)
                .setDescription(`<@${message.author.id}>位於 <#${message.channel.id}>\n`)
                .setTimestamp();
            const attachment = new Discord.AttachmentBuilder(att.proxyURL, { name: att.name });
            OutputChannel.send({ embeds: [attEmbed], files: [attachment] });
        }
    },

    getLocalString(lang: string, objectKey: string, ...vars: any[]): string {
        // let str = XXX[lang][objectKey];
        // if (!str ) return null;
        let str = "A %VAR% is %VAR% %VAR%"
        let ss = str.split("%VAR%");
        let output = ss.map(function (x, i) {
            return i < ss.length - 1 ? (vars[i] ? x + vars[i] : x + "%VAR%") : x
        }.bind(this)).join('');
        return output
    },

    getLocalString2(lang: string, objectKey: string, vars: any[] | Object): string {
        // let str = XXX[lang][objectKey];
        // if (!str ) return null;
        let str = "A %VAR% is %VAR% %VAR%"
        let ss = str.split("%VAR%");
        let output = ss.map(function (x, i) {
            return i < ss.length - 1 ? (vars[i] ? x + vars[i] : x + "%VAR%") : x
        }.bind(this)).join('');
        return output
    },

    isless(snowflake1: string, snowflake2: string): boolean {
        return ((snowflake1 < snowflake2 && snowflake1.length == snowflake2.length)
            || snowflake1.length < snowflake2.length)
    },

    setTimeZone(client: ZClient) {
        var MyDate = new Date();
        var MyOffset = (MyDate.getTimezoneOffset()) / -60;
        client.botStatus['timezone'] = MyOffset
    },

    outputGuilds(client: ZClient) {
        let guilds = client.guilds.cache.map(guild => new Array(guild.id, guild.name, String(auth.isAuthGuild(guild.id))));
        console.log(guilds);
    },

    async initCatOpen(client: ZClient) {
        let channelID = dataJson["channel"]["botStatus_cat"]
        let msg_id = dataJson["msg_id"]["CatOpen"]
        let channel = await client.channels.fetch(channelID) as Discord.TextChannel
        let message = await channel.messages.fetch(msg_id);
        client.botStatus['catOpen'] = message.content.includes('開') ? true : false


        let msg_id2 = dataJson["msg_id"]["CatAdmin"]
        let message2 = await channel.messages.fetch(msg_id2);
        client.botStatus['catAdmin'] = message2.content.includes('開') ? true : false
        // `釣魚伺服器` 領取 **`管理員`** 身分組 : 關 (:x:)
    },

    async initMusicPlay(client: ZClient) {
        let channelID = dataJson["channel"]["botStatus_main"]
        let msg_id = dataJson["msg_id"]["MusicPlay"]
        let channel = await client.channels.fetch(channelID) as Discord.TextChannel
        let message = await channel.messages.fetch(msg_id);
        client.botStatus['musicPlay'] = message.content.includes('開') ? true : false
    },

    async initVfDaily(client: ZClient) {
        // https://discord.com/channels/988795992667193395/991256310563733564/1016235047797407754

        let channelID = dataJson["channel"]["botStatus_main"]
        let msg_id = dataJson["msg_id"]["VfDaily"]
        let channel = await client.channels.fetch(channelID) as Discord.TextChannel
        let message = await channel.messages.fetch(msg_id);
        let msgEditTime = new Date(message.editedTimestamp ? message.editedTimestamp : message.createdTimestamp)
        let Now = new Date()
        console.log(msgEditTime.getUTCDate() != Now.getUTCDate())
        if (msgEditTime.getUTCDate() != Now.getUTCDate()) {
            message.edit('`釣魚機器人` 狀態: 未完成 (❌)')
            client.botStatus['daily'] = false;
        } else {
            client.botStatus['daily'] = message.content.includes('已完成');
        }
    },

    async initFishCount(client: ZClient) {
        // https://discord.com/channels/988795992667193395/991256310563733564/1016235047797407754

        let channelID = dataJson["channel"]["botStatus_main"]
        let msg_id = dataJson["msg_id"]["FishCount"]
        let channel = await client.channels.fetch(channelID) as Discord.TextChannel
        let message = await channel.messages.fetch(msg_id);
        const content = message.content
        const mats = content.match(/^`上次釣魚` : (\d+)\n`這次釣魚` : (\d+)$/);
        if (!mats) {
            console.log(content)
            console.log(mats)
            return;
        }
        client.botStatus['Before_fish_count'] = Number(mats[1]);
        client.botStatus['Now_fish_count'] = Number(mats[2]);
        client.botStatus['fish_count_message'] = message;

    },

    async initMentionsEgg(client: ZClient) {
        let channelID = dataJson["channel"]["botStatus_main"]
        let msg_id = dataJson["msg_id"]["MentionsEgg"]
        let channel = await client.channels.fetch(channelID) as Discord.TextChannel
        let message = await channel.messages.fetch(msg_id);
        client.botStatus['mentionsEgg'] = message.content.includes('開') ? true : false
    },


    async setRewardSnowflake(client: ZClient) {
        let channelID = dataJson["channel"]["botStatus_main"]
        let msg_id = dataJson["msg_id"]["RewardSnowflake"]
        let channel = await client.channels.fetch(channelID) as Discord.TextChannel
        let message = await channel.messages.fetch(msg_id);
        const content = message.content
        const mats = content.match(/^`昨日紀錄區` : (\d{18,})\n`當日紀錄區` : (\d{18,})$/);
        if (!mats) {
            console.log(content)
            console.log(mats)
            return;
        }
        client.botStatus['Yesterday_reward_snowflake'] = mats[1]
        client.botStatus['Now_reward_snowflake'] = mats[2]
    },

    Console_Send(client: ZClient, obj: any) {
        if (!obj) return;
        (client.botStatus["Error_Log_Channel"] as Discord.TextChannel).send({ content: `𝔾:${obj}` });
    },

    async setErrorLogChannel(client: ZClient) {
        let guild = client.guilds.cache.get(process.env.LOG_GUILD)
        let channelId = process.env.LOG_CHANNEL;
        let channel = await guild.channels.fetch(channelId) as Discord.TextChannel;
        client.botStatus["Error_Log_Channel"] = channel;
    },

    ExecShedule(client: ZClient) {

        if (client.botStatus['timezone'] != 0) {
            console.log(`'timezone' : ${client.botStatus['timezone']}`);
            return;

        }
        console.log(client.schedules.keys())
        for (let [n, s] of client.schedules) {
            s.execute(client);
        }
    },

    loadInitBotStatus(client: ZClient) {
        this.setErrorLogChannel(client);
        this.setTimeZone(client);
        this.setRewardSnowflake(client);
        this.initCatOpen(client);
        this.initMusicPlay(client);
        this.initVfDaily(client);
        this.initFishCount(client);
        this.initMentionsEgg(client);
        this.ExecShedule(client);
        this.outputGuilds(client);
    },

    usageString(client: ZClient, exec: Executor | any): string {
        if (!exec.usage || !exec.usage.length) return null;
        let temp: string[] = [];
        if (exec.description) temp.push(exec.description);
        for (let i = 0; i < exec.usage.length; ++i) {
            if (Array.isArray(exec.usage[i]))
                temp.push('`' + `${i + 1}. ${exec.usage[i][0] + '`'} **⇨** ${'`' + client.prefix + exec.name + ' ' + exec.usage[i][1] + '`'}`);
            else
                temp.push('`' + `${i + 1}.\` ${'`' + client.prefix + exec.name + ' ' + exec.usage[i] + '`'}`);
        }
        return temp.join('\n')
    }
};