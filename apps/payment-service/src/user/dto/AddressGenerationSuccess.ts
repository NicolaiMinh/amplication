import { IsString } from "class-validator";
export class AddressGenerationSuccess {
    @IsString()
    address_1!: string;
}