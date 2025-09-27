import Logger from "logger";
import type { LnOptions, Nullable } from "./types/index.js";
declare class Ln {
    logger: Logger;
    locales: Map<string, Map<string, string>>;
    private default;
    private directory;
    constructor(options: LnOptions);
    load(): Promise<void>;
    t(key: string, language: string, vars?: Nullable<Record<string, string>>): string;
}
export default Ln;
export { Ln, };
