import {LogLevel} from "./core/types";


export interface LoggerMetadata {
  service: string;
}

export const APPLICATION_LOGGER_MODULE_OPTIONS =
  "APPLICATION_LOGGER_MODULE_OPTIONS";

export interface ApplicationLoggerModulesOptions {
  serviceName: string;
  logLevel?: LogLevel;
  isProduction?: boolean;
}
