import * as erela from "erela.js";
import { ZClient } from "../client";

export interface PlayerManager {
    manager: erela.Manager;
    restoreMusicStatus(this: ZClient): Promise<void>;
}