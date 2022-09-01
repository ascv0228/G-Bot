export interface MemoryPercent {
    amount: number;
    amount_mb: string;
    percent?: string;
}

export interface MemoryInfo {
    total: MemoryPercent;
    usage: MemoryPercent;
    free: MemoryPercent;
}

export interface ProcessInfo {
    name: string;
    pid: string;
    usage: number;
    percent: string;
}