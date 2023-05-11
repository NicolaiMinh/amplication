import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { AddressService } from "./address.service";
import { AddressControllerBase } from "./base/address.controller.base";
// import {KafkaService} from "../kafka/kafka.service";
import {Ctx, EventPattern, KafkaContext, MessagePattern, Payload} from "@nestjs/microservices";
import {MessageBrokerTopics} from "../kafka/topics";
import {AddressCreateInput} from "./base/AddressCreateInput";
import {Inject, Logger} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {validateOrReject} from "class-validator";
import {ConfigService} from "@nestjs/config";
import {Env} from "../env";
import {KAFKA_CLIENT, KafkaProducerService} from "@app/kafka";
import {ApplicationLogger} from "@app/logging";

@swagger.ApiTags("addresses")
@common.Controller("addresses")
export class AddressController extends AddressControllerBase {
  //protected readonly logger = new Logger(AddressController.name);
  constructor(
    protected readonly service: AddressService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    protected readonly configService: ConfigService<Env, true>,
    protected readonly producerService: KafkaProducerService,
    @Inject(ApplicationLogger)
    protected readonly logger: ApplicationLogger
  ) {
    super(service, rolesBuilder, configService, producerService, logger,);
  }

  // @EventPattern(
  //     MessageBrokerTopics.TopicSampleV1
  // )
  // async onCodeGenerationFailure(
  //     @Payload() message: AddressGenerationSuccess
  // ): Promise<void> {
  //   this.logger.info(`onCodeGenerationFailure ${AddressCreateInput}`);
  //   const args = plainToInstance(AddressGenerationSuccess, message);
  //   console.log(`onCodeGenerationFailure ${args}`);
  // }

  // @EventPattern(MessageBrokerTopics.TopicSampleV1)
  // async generatePullRequest(
  //     @Payload() message: AddressGenerationSuccess,
  //     @Ctx() context: KafkaContext
  // ) {
  //   const validArgs = plainToInstance(AddressGenerationSuccess, message);
  //   await validateOrReject(validArgs);
  //
  //   const offset = context.getMessage().offset;
  //   const topic = context.getTopic();
  //   const partition = context.getPartition();
  //
  //   this.logger.info(`Got a new generate pull request item from queue.`, {
  //     topic,
  //     partition,
  //     offset: offset,
  //     class: this.constructor.name,
  //     args: validArgs,
  //   });
  // }

  // @EventPattern(
  //     EnvironmentVariables.instance.get(Env.TopicSampleV2, true)
  // )
  // @EventPattern("topic.sample.v1")
  // async generatePullRequest2(
  //     @Payload() message: AddressGenerationSuccess,
  //     @Ctx() context: KafkaContext
  // ) {
  //   const validArgs = plainToInstance(AddressGenerationSuccess, message);
  //   await validateOrReject(validArgs);
  //
  //   const offset = context.getMessage().offset;
  //   const topic = context.getTopic();
  //   const partition = context.getPartition();
  //
  //   this.logger.info(`Got a new generatePullRequest2.`, {
  //     topic,
  //     partition,
  //     offset: offset,
  //     class: this.constructor.name,
  //     args: validArgs,
  //   });
  // }
}
