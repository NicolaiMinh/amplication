import { Module } from "@nestjs/common";
import { PaymentModuleBase } from "./base/payment.module.base";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { PaymentResolver } from "./payment.resolver";

@Module({
  imports: [PaymentModuleBase],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentResolver],
  exports: [PaymentService],
})
export class PaymentModule {}
