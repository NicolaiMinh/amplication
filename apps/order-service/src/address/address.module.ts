import { Module } from "@nestjs/common";
import { AddressModuleBase } from "./base/address.module.base";
import { AddressService } from "./address.service";
import { AddressController } from "./address.controller";
import { AddressResolver } from "./address.resolver";
import {KafkaModule} from "../kafka/kafka.module";

@Module({
  imports: [AddressModuleBase, KafkaModule],
  controllers: [AddressController],
  providers: [AddressService, AddressResolver],
  exports: [AddressService],
})
export class AddressModule {}
