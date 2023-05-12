import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { KAFKA_CLIENT } from "../createNestjsKafkaConfig";
import {IKafkaMessageSerializer, KAFKA_SERIALIZER} from "../core/types/serializer.types";
import {DecodedKafkaMessage, SchemaIds} from "../core/types/kafka.types";

export const KAFKA_PRODUCER_SERVICE_NAME = "KAFKA_PRODUCER_SERVICE";

@Injectable()
export class KafkaProducerService {
  constructor(
    @Inject(KAFKA_CLIENT)
    private readonly kafkaClient: ClientKafka,
    @Inject(KAFKA_SERIALIZER)
    private readonly serializer: IKafkaMessageSerializer
  ) {}

  async emitMessageSerializer(
    topic: string,
    message: DecodedKafkaMessage,
    schemaIds?: SchemaIds
  ): Promise<void> {
    const kafkaMessage = await this.serializer.serialize(message, schemaIds);
    return await new Promise((resolve, reject) => {
      this.kafkaClient.emit(topic, kafkaMessage).subscribe({
        error: (err: Error) => {
          reject(err);
        },
        next: () => {
          resolve();
        },
      });
    });
  }

  async emitMessage(topic: string, message: string): Promise<void> {
    return await new Promise((resolve, reject) => {
      this.kafkaClient.emit(topic, message).subscribe({
        error: (err: any) => {
          reject(err);
        },
        next: () => {
          resolve();
        },
      });
    });
  }

  async emitMessageWithKey(
      topic: string,
      key: string,
      value: string
  ): Promise<void> {
    return await new Promise((resolve, reject) => {
      this.kafkaClient.emit(topic, { key, value }).subscribe({
        error: (err: any) => {
          reject(err);
        },
        next: () => {
          resolve();
        },
      });
    });
  }

}
