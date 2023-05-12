import {Inject, Injectable} from "@nestjs/common";
import { KafkaServiceBase } from "./base/kafka.service.base";
import {ClientKafka} from "@nestjs/microservices";

@Injectable()
export class KafkaService extends KafkaServiceBase {
    constructor(
        @Inject("KAFKA_CLIENT")
        protected readonly kafkaClient: ClientKafka
    ) {super(kafkaClient);}

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
