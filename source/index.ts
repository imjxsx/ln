import Logger from "logger";
import type { LnOptions, Nullable } from "./types/index.js";
import fs from "node:fs";
import path from "node:path";

class Ln {
  public logger: Logger;
  public locales: Map<string, Map<string, string>>;
  private default: string;
  private directory: string;
  constructor(options: LnOptions) {
    this.logger = options.logger || new Logger({
      name: "Ln",
      colorize: true,
      level: "INFO",
    });
    this.locales = new Map();
    this.default = options.default;
    this.directory = options.directory;
  }
  public async load() {
    try {
      const directory = await fs.promises.stat(this.directory);
      if (!directory.isDirectory()) {
        this.logger.fatal("The \"directory\" parameter must be a path to a valid directory.");
        return;
      }
      const files = await fs.promises.readdir(this.directory);
      if (!files.some((file) => path.extname(file) === ".lang")) {
        this.logger.warn("There is no file with the \"lang\" extension in the specified directory.");
        return;
      }
      for (const file of files) {
        this.logger.info(`Reading the contents of the file "${file}".`);
        const content = await fs.promises.readFile(path.resolve(this.directory, file), "utf8");
        this.logger.trace({
          file,
          content,
        });
        if (!content.length) {
          this.logger.info(`File "${file}" has no content, skipping file.`);
          continue;
        }
        const lines = content.split("\n").map((line) => line.trim()).filter((line) => line !== "" && !/^\#/.test(line));
        this.logger.trace({
          file,
          lines,
        });
        if (!lines.length) {
          this.logger.info(`File "${file}" has no lines, skipping file.`);
          continue;
        }
        if (!this.locales.has(path.basename(file, ".lang"))) {
          this.locales.set(path.basename(file, ".lang"), new Map());
        }
        const locale = this.locales.get(path.basename(file, ".lang"))!;
        for (let i = 0; i < lines.length; i++) {
          this.logger.info(`Processing line number "${i}" of file "${file}".`);
          const line = lines[i];
          this.logger.trace({
            file,
            line: i,
            content: line,
          });
          const match = line?.match(/^([^=]+)=(.*)$/);
          if (!match || !match[1] || !match[2]) {
            this.logger.info(`Line number "${i}" of file "${file}" has no valid key=value.`);
            continue;
          }
          const [, key, value] = match;
          this.logger.trace({
            file,
            line: i,
            key: key.trim(),
            value: value.trim(),
          });
          locale.set(key.trim(), value.trim());
        }
        this.logger.info(`The file "${file}" has finished processing.`);
        this.logger.trace({
          file,
          keys: locale.size,
        });
      }
      this.logger.info("All files have been processed.");
      this.logger.trace({
        locales: Array.from(this.locales.keys()),
      });
    } catch (e) {
      this.logger.error(e);
    }
  }
  public t(key: string, language: string, vars?: Nullable<Record<string, string>>): string {
    this.logger.info(`GET "${key}".`);
    this.logger.trace({
      key,
      language,
      vars: vars || {},
    });
    const locale = this.locales.get(language) || this.locales.get(this.default);
    let text = locale?.get(key) || key;
    if (text === key) {
      this.logger.info(`Key "${key}" not found.`);
      return text;
    }
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(new RegExp(`%${k}%`, "g"), v);
      });
    }
    this.logger.trace({
      key,
      language,
      value: text,
    });
    return text;
  }
}
export default Ln;
export {
  Ln,
};