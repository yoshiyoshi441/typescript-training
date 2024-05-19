import log4js from "log4js";

export class Log4jsConfig {
  static config() {
    log4js.configure({
      appenders: {
        stdout: {
          type: "stdout",
          layout: { type: "colored" },
        },
      },
      categories: {
        default: {
          appenders: ["stdout"],
          level: "info",
          enableCallStack: true,
        },
      },
    });
  }
}
