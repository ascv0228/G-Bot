import { ZClient } from "../client";

export interface Message {
    loadMessages(this: ZClient): void;
}

export type EchosEvent = { [key: string]: string };

export interface EchoMessage {
    name?: string;
    id: string;
    cid: string;
    echo?: EchosEvent;
    callbackEvent?: EchosEvent;
}