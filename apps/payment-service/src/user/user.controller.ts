import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserControllerBase } from "./base/user.controller.base";
import {Logger} from "@nestjs/common";
import {Ctx, EventPattern, KafkaContext, Payload} from "@nestjs/microservices";
import {MessageBrokerTopics} from "../kafka/topics";
import {AddressGenerationSuccess} from "./dto/AddressGenerationSuccess";
import {plainToInstance} from "class-transformer";
import {validateOrReject} from "class-validator";

@swagger.ApiTags("users")
@common.Controller("users")
export class UserController extends UserControllerBase {
  private readonly logger = new Logger(UserController.name);

  constructor(protected readonly service: UserService) {
    super(service);
  }

  // @EventPattern(MessageBrokerTopics.TopicSampleV1)
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
  //   console.log("generatePullRequest2 message: ", message);
  //   this.logger.log(`Got a new generatePullRequest2.`, {
  //     topic,
  //     partition,
  //     offset: offset,
  //     class: this.constructor.name,
  //     args: validArgs,
  //   });
  //
  // }

  @EventPattern(MessageBrokerTopics.TopicSampleV1)
  async onDsgLog(@Payload() message: any): Promise<void> {
    //const messageEntry = plainToInstance(AddressGenerationSuccess, message);
    this.logger.log(`Got a new onDsgLog.`, {message });
  }
  //
  // @EventPattern(EnvironmentVariables.instance.get(Env.TopicSampleV2, true))
  // async onDsgLog1(@Payload() message: AddressGenerationSuccess): Promise<void> {
  //   const messageEntry = plainToInstance(AddressGenerationSuccess, message);
  //   console.log("onDsgLog1 message: ", messageEntry);
  //   this.logger.log(`Got a new onDsgLog1.`, {messageEntry });
  // }
}
