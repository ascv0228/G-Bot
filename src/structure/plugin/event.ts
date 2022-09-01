import { ZClient } from "../client";

export interface Event {
    loadEvents(this: ZClient): Promise<any>;
}