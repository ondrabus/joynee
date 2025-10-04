import React from 'react';
import { List, Datagrid, TextField, BooleanField, Edit, Create, Show, SimpleForm, TextInput, BooleanInput, ShowButton, EditButton, DeleteButton } from 'react-admin';

export const AccountList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <BooleanField source="active" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const AccountShow = () => (
  <Show>
    <TextField source="id" />
    <TextField source="name" />
    <BooleanField source="active" />
  </Show>
);

export const AccountEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <BooleanInput source="active" />
    </SimpleForm>
  </Edit>
);

export const AccountCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <BooleanInput source="active" defaultValue={true} />
    </SimpleForm>
  </Create>
); 