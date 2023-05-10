import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PaymentService } from "./payment.service";
import { PaymentControllerBase } from "./base/payment.controller.base";
import {AddressGenerationSuccess} from "../../../order-service/src/address/dto/AddressGenerationSuccess";
import {Ctx, EventPattern, KafkaContext, Payload} from "@nestjs/microservices";
import {plainToInstance} from "class-transformer";
import {validateOrReject} from "class-validator";
import {ApplicationLogger} from "../../../libs/src/util/logging";
import {Inject} from "@nestjs/common";

@swagger.ApiTags("payments")
@common.Controller("payments")
export class PaymentController extends PaymentControllerBase {
  constructor(
    protected readonly service: PaymentService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
    @Inject(ApplicationLogger)
    protected readonly logger: ApplicationLogger
  ) {
    super(service, rolesBuilder, logger);
  }

}
