import React from 'react';
import { List, Datagrid, TextField, Edit, Create, Show, SimpleForm, TextInput, ShowButton, EditButton, DeleteButton } from 'react-admin';

export const UserPlaceholderList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="emailPattern" />
      <TextField source="hashtagSuggestions" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const UserPlaceholderShow = () => (
  <Show>
    <TextField source="id" />
    <TextField source="name" />
    <TextField source="emailPattern" />
    <TextField source="hashtagSuggestions" />
  </Show>
);

export const UserPlaceholderEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="emailPattern" />
      <TextInput source="hashtagSuggestions" />
    </SimpleForm>
  </Edit>
);

export const UserPlaceholderCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="emailPattern" />
      <TextInput source="hashtagSuggestions" />
    </SimpleForm>
  </Create>
); 