import { ZClient } from "../client";

export interface Installer {
    install(client: ZClient): void;
}