import { Module } from "@nestjs/common";
import { ProductModuleBase } from "./base/product.module.base";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { ProductResolver } from "./product.resolver";
import {KafkaModule} from "../kafka/kafka.module";
import {KafkaService} from "../kafka/kafka.service";

@Module({
  imports: [ProductModuleBase, KafkaModule],
  controllers: [ProductController],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
