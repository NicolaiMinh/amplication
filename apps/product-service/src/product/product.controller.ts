import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ProductService } from "./product.service";
import { ProductControllerBase } from "./base/product.controller.base";
import {Ctx, EventPattern, KafkaContext, Payload} from "@nestjs/microservices";
import {MessageBrokerTopics} from "../kafka/topics";
import {plainToInstance} from "class-transformer";
import {validateOrReject} from "class-validator";
import {Logger, UseGuards} from "@nestjs/common";
import {AddressGenerationSuccess} from "./dto/AddressGenerationSuccess";
import {AuthGuard} from "@nestjs/passport";

@swagger.ApiTags("products")
@common.Controller("products")
export class ProductController extends ProductControllerBase {
  private readonly logger = new Logger(ProductController.name);
  constructor(
    protected readonly service: ProductService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }

  @EventPattern(MessageBrokerTopics.TopicSampleV1)
  async generatePullRequest2(
      @Payload() message: AddressGenerationSuccess,
      @Ctx() context: KafkaContext
  ) {
    const validArgs = plainToInstance(AddressGenerationSuccess, message);
    await validateOrReject(validArgs);

    const offset = context.getMessage().offset;
    const topic = context.getTopic();
    const partition = context.getPartition();
    console.log("generatePullRequest2 message: ", message);
    this.logger.log(`Got a new generatePullRequest2.`, {
      topic,
      partition,
      offset: offset,
      class: this.constructor.name,
      args: validArgs,
    });

  }

  @EventPattern(MessageBrokerTopics.TopicSampleV1)
  async onDsgLog(@Payload() message: AddressGenerationSuccess): Promise<void> {
    const messageEntry = plainToInstance(AddressGenerationSuccess, message);
    console.log("onDsgLog message: ", messageEntry);
    this.logger.log(`Got a new onDsgLog.`, {messageEntry });
  }
}
