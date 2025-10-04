import React from 'react';
import { List, Datagrid, TextField, NumberField, Edit, Create, Show, SimpleForm, TextInput, NumberInput, ShowButton, EditButton, DeleteButton } from 'react-admin';

export const UserPhotoList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="url" />
      <TextField source="caption" />
      <NumberField source="userId" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const UserPhotoShow = () => (
  <Show>
    <TextField source="id" />
    <TextField source="url" />
    <TextField source="caption" />
    <NumberField source="userId" />
  </Show>
);

export const UserPhotoEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="url" />
      <TextInput source="caption" />
      <NumberInput source="userId" disabled />
    </SimpleForm>
  </Edit>
);

export const UserPhotoCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="url" />
      <TextInput source="caption" />
      <NumberInput source="userId" />
    </SimpleForm>
  </Create>
);
