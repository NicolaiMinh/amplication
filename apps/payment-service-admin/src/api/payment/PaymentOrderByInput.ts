import { SortOrder } from "../../util/SortOrder";

export type PaymentOrderByInput = {
  cardNo?: SortOrder;
  cardPlaceholder?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  transactionDeposit?: SortOrder;
  updatedAt?: SortOrder;
};
