import { Payment as TPayment } from "../api/payment/Payment";

export const PAYMENT_TITLE_FIELD = "cardNo";

export const PaymentTitle = (record: TPayment): string => {
  return record.cardNo || String(record.id);
};
