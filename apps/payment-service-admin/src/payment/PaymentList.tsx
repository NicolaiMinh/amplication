import * as React from "react";
import { List, Datagrid, ListProps, TextField, DateField } from "react-admin";
import Pagination from "../Components/Pagination";

export const PaymentList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Payments"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <TextField label="CardNo" source="cardNo" />
        <TextField label="CardPlaceholder" source="cardPlaceholder" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="TransactionDeposit" source="transactionDeposit" />
        <DateField source="updatedAt" label="Updated At" />
      </Datagrid>
    </List>
  );
};
