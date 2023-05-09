import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { OrderService } from "./order.service";
import { OrderControllerBase } from "./base/order.controller.base";
import {MessagePattern, Payload} from "@nestjs/microservices";
import {MessageBrokerTopics} from "../kafka/topics";
import {Logger} from "@nestjs/common";

@swagger.ApiTags("orders")
@common.Controller("orders")
export class OrderController extends OrderControllerBase {
  constructor(
    protected readonly service: OrderService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    // protected readonly kafkaService: KafkaService
  ) {
    super(service, rolesBuilder);
  }
}
