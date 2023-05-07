import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  NumberInput,
} from "react-admin";

export const PaymentCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="CardNo" source="cardNo" />
        <TextInput label="CardPlaceholder" source="cardPlaceholder" />
        <NumberInput label="TransactionDeposit" source="transactionDeposit" />
      </SimpleForm>
    </Create>
  );
};
