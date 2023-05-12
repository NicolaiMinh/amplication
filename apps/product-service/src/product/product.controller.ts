import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ProductService } from "./product.service";
import { ProductControllerBase } from "./base/product.controller.base";
import {ClientKafka, Ctx, EventPattern, KafkaContext, MessagePattern, Payload} from "@nestjs/microservices";
import {validateOrReject} from "class-validator";
import {plainToInstance} from "class-transformer";
import {Inject, OnModuleInit} from "@nestjs/common";
import {Env} from "../env";
import {AddressGenerationSuccess} from "./dto/AddressGenerationSuccess";
import {ApplicationLogger} from "@app/logging";
import {EnvironmentVariables} from "@app/kafka/core/environmentVariables";
import { Logger } from "@nestjs/common";
import {KAFKA_CLIENT, KafkaProducerService} from "@app/kafka";


@swagger.ApiTags("products")
@common.Controller("products")
export class ProductController extends ProductControllerBase{
  private readonly logger = new Logger(ProductController.name);

  constructor(
    protected readonly service: ProductService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    protected readonly producerService: KafkaProducerService,
    //@Inject(ApplicationLogger)
    // protected readonly logger: ApplicationLogger
  ) {
    super(service, rolesBuilder, producerService);
  }

  @EventPattern(
      EnvironmentVariables.instance.get(Env.TopicSampleV2, true)
  )
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

  @EventPattern(EnvironmentVariables.instance.get(Env.TopicSampleV2, true))
  async onDsgLog(@Payload() message: AddressGenerationSuccess): Promise<void> {
    const messageEntry = plainToInstance(AddressGenerationSuccess, message);
    console.log("onDsgLog message: ", messageEntry);
    this.logger.log(`Got a new onDsgLog.`, {messageEntry });
  }
  //
  // @EventPattern(EnvironmentVariables.instance.get(Env.TopicSampleV2, true))
  // async onDsgLog1(@Payload() message: AddressGenerationSuccess): Promise<void> {
  //   const messageEntry = plainToInstance(AddressGenerationSuccess, message);
  //   console.log("onDsgLog1 message: ", messageEntry);
  //   this.logger.log(`Got a new onDsgLog1.`, {messageEntry });
  // }
}
