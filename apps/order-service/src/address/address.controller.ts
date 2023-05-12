import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { AddressService } from "./address.service";
import { AddressControllerBase } from "./base/address.controller.base";
import {KafkaService} from "../kafka/kafka.service";
import {EventPattern, Payload} from "@nestjs/microservices";
import {MessageBrokerTopics} from "../kafka/topics";
import {AddressGenerationSuccess} from "./dto/AddressGenerationSuccess";
import {plainToInstance} from "class-transformer";

@swagger.ApiTags("addresses")
@common.Controller("addresses")
export class AddressController extends AddressControllerBase {
  constructor(
    protected readonly service: AddressService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    protected readonly kafkaService: KafkaService
  ) {
    super(service, rolesBuilder, kafkaService);
  }

  @EventPattern(
      MessageBrokerTopics.TopicSampleV1
  )
  async onCodeGenerationFailure(
      @Payload() message: AddressGenerationSuccess
  ): Promise<void> {
    this.logger.log(`onCodeGenerationFailure ${message}`);
    const args = plainToInstance(AddressGenerationSuccess, message);
    this.logger.log(`onCodeGenerationFailure args ${message}`);
    console.log(`onCodeGenerationFailure ${args}`);
  }
}
