import React from 'react';
import { List, Datagrid, TextField, NumberField, Edit, Create, Show, SimpleForm, TextInput, NumberInput, ShowButton, EditButton, DeleteButton } from 'react-admin';

export const UserSettingsList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="key" />
      <TextField source="value" />
      <NumberField source="userId" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const UserSettingsShow = () => (
  <Show>
    <TextField source="id" />
    <TextField source="key" />
    <TextField source="value" />
    <NumberField source="userId" />
  </Show>
);

export const UserSettingsEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="key" />
      <TextInput source="value" />
      <NumberInput source="userId" disabled />
    </SimpleForm>
  </Edit>
);

export const UserSettingsCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="key" />
      <TextInput source="value" />
      <NumberInput source="userId" />
    </SimpleForm>
  </Create>
);
