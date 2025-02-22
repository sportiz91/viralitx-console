import winston from "winston";
import { WinstonRotatingFile } from "winston-rotating-file";
import appRoot from "app-root-path";

import config from "../config/config";

type LogLevelType = "debug" | "info";

interface ErrorInfo extends winston.Logform.TransformableInfo {
  stack?: string;
}

interface LoggerOptions extends winston.LoggerOptions {
  level: LogLevelType;
  format: winston.Logform.Format;
  transports: winston.transport[];
}

const logLevel: LogLevelType = config.env === "development" ? "debug" : "info";

const logsPath: string = `${appRoot}/runtime/logs`;

const enumerateCallback = (
  info: winston.Logform.TransformableInfo
): winston.Logform.TransformableInfo => {
  const errorInfo = info as ErrorInfo;

  if (!errorInfo.stack) {
    return info;
  }

  return Object.assign(
    {
      message: `${info.message as string}\n${errorInfo.stack}`,
      stack: errorInfo.stack,
    },
    info
  );
};

const consoleFormatCallback = (
  info: winston.Logform.TransformableInfo
): string => `${info.level}: ${info.message as string}`;

const fileFormatCallback = (info: winston.Logform.TransformableInfo): string =>
  `${info["timestamp"]} ${info.level}: ${info.message as string}\n`;

const getTransports = (): winston.transport[] => [
  new winston.transports.Console({
    stderrLevels: ["error"],
    format: consoleFormat,
  }),
  new WinstonRotatingFile({
    filename: "viralitx-console.log",
    level: logLevel,
    format: fileFormat,
    rfsOptions: {
      path: logsPath,
      size: "10M",
      interval: "1d",
      compress: "gzip",
    },
  }),
];

const enumerateErrorFormat = winston.format(enumerateCallback);

const baseFormat: winston.Logform.Format = winston.format.combine(
  enumerateErrorFormat(),
  winston.format.splat()
);

const consoleFormat: winston.Logform.Format = winston.format.combine(
  winston.format.colorize(),
  winston.format.printf(consoleFormatCallback)
);

const fileFormat: winston.Logform.Format = winston.format.combine(
  winston.format.uncolorize(),
  winston.format.timestamp(),
  winston.format.printf(fileFormatCallback)
);

export default winston.createLogger({
  level: logLevel,
  format: baseFormat,
  transports: getTransports(),
} as LoggerOptions);
