type LogLevel = "debug" | "info" | "warn" | "error";

const shouldLog = (level: LogLevel): boolean => {
  if (level === "debug") {
    return process.env.LOG_LEVEL === "debug";
  }

  return true;
};

const log = (level: LogLevel, ...args: unknown[]): void => {
  if (!shouldLog(level)) {
    return;
  }

  const method = level === "debug" ? "debug" : level;
  console[method](...args);
};

export const logger = {
  debug: (...args: unknown[]) => log("debug", ...args),
  info: (...args: unknown[]) => log("info", ...args),
  warn: (...args: unknown[]) => log("warn", ...args),
  error: (...args: unknown[]) => log("error", ...args)
};
