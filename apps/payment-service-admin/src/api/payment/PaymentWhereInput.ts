import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { FloatNullableFilter } from "../../util/FloatNullableFilter";

export type PaymentWhereInput = {
  cardNo?: StringFilter;
  cardPlaceholder?: StringNullableFilter;
  id?: StringFilter;
  transactionDeposit?: FloatNullableFilter;
};
