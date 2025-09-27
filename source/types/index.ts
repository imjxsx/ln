import type Logger from "logger";

export type Nullable<T> = T | undefined | null;
export interface LnOptions {
  default: string;
  directory: string;
  logger?: Nullable<Logger>;
}