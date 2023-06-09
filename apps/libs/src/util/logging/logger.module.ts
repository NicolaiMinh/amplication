import { DynamicModule, Global, Module } from "@nestjs/common";
import { ApplicationLogger } from "./logger.service";
import {
  ApplicationLoggerModulesOptions,
  APPLICATION_LOGGER_MODULE_OPTIONS,
} from "./types";

@Global()
@Module({})
export class ApplicationLoggerModule {
  static forRoot(options: ApplicationLoggerModulesOptions): DynamicModule {
    return {
      module: ApplicationLoggerModule,
      providers: [
        {
          provide: APPLICATION_LOGGER_MODULE_OPTIONS,
          useValue: options,
        },
        ApplicationLogger,
      ],
      exports: [ApplicationLogger],
    };
  }
}
