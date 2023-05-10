import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ProductService } from "./product.service";
import { ProductControllerBase } from "./base/product.controller.base";
import {Ctx, EventPattern, KafkaContext, Payload} from "@nestjs/microservices";
import {EnvironmentVariables} from "../../../libs/src";
import {validateOrReject} from "class-validator";
import {plainToInstance} from "class-transformer";
import {ApplicationLogger} from "../../../libs/src/util/logging";
import {Inject} from "@nestjs/common";
import {Env} from "../env";
import {AddressGenerationSuccess} from "./dto/AddressGenerationSuccess";

@swagger.ApiTags("products")
@common.Controller("products")
export class ProductController extends ProductControllerBase {
  constructor(
    protected readonly service: ProductService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    @Inject(ApplicationLogger)
    protected readonly logger: ApplicationLogger
  ) {
    super(service, rolesBuilder, logger);
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

    this.logger.info(`Got a new generatePullRequest2.`, {
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
    this.logger.info(`Got a new onDsgLog.`, {messageEntry });
  }
}
