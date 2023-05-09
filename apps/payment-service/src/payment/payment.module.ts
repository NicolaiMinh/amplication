import { Module } from "@nestjs/common";
import { PaymentModuleBase } from "./base/payment.module.base";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { PaymentResolver } from "./payment.resolver";
import {KafkaModule} from "../../../libs/src/util/kafka";

@Module({
  imports: [PaymentModuleBase, KafkaModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentResolver],
  exports: [PaymentService],
})
export class PaymentModule {}
