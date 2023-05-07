import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  NumberInput,
} from "react-admin";

export const PaymentEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="CardNo" source="cardNo" />
        <TextInput label="CardPlaceholder" source="cardPlaceholder" />
        <NumberInput label="TransactionDeposit" source="transactionDeposit" />
      </SimpleForm>
    </Edit>
  );
};
