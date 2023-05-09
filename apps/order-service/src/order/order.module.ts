import { Module } from "@nestjs/common";
import { OrderModuleBase } from "./base/order.module.base";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { OrderResolver } from "./order.resolver";
// import {KafkaModule} from "../kafka/kafka.module";

@Module({
  // imports: [OrderModuleBase, KafkaModule],
  imports: [OrderModuleBase],
  controllers: [OrderController],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
