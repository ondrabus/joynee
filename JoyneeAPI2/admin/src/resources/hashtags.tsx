import React from 'react';
import { List, Datagrid, TextField, BooleanField, Edit, Create, Show, SimpleForm, TextInput, BooleanInput, ShowButton, EditButton, DeleteButton } from 'react-admin';

export const HashtagList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="text" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const HashtagShow = () => (
  <Show>
    <TextField source="id" />
    <TextField source="text" />
  </Show>
);

export const HashtagEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="text" />
    </SimpleForm>
  </Edit>
);

export const HashtagCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="text" />
    </SimpleForm>
  </Create>
); 