import {Inject, OnModuleInit} from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

export class KafkaServiceBase implements OnModuleInit{
  constructor(@Inject("KAFKA_CLIENT") protected kafkaClient: ClientKafka) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }
}
