import React from 'react';
import { List, Datagrid, TextField, BooleanField, DateField, Edit, Create, Show, SimpleForm, TextInput, BooleanInput, SelectInput, ShowButton, EditButton, DeleteButton } from 'react-admin';

export const BubbleList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="lang" />
      <TextField source="type" />
      <BooleanField source="active" />
      <DateField source="createdAt" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const BubbleShow = () => (
  <Show>
    <TextField source="id" />
    <TextField source="name" />
    <TextField source="lang" />
    <TextField source="type" />
    <BooleanField source="active" />
    <DateField source="createdAt" />
    <DateField source="updatedAt" />
  </Show>
);

export const BubbleEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <SelectInput source="lang" choices={[
        { id: 'en', name: 'English' },
        { id: 'cs', name: 'Czech' }
      ]} />
      <TextInput source="type" />
      <BooleanInput source="active" />
    </SimpleForm>
  </Edit>
);

export const BubbleCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <SelectInput source="lang" choices={[
        { id: 'en', name: 'English' },
        { id: 'cs', name: 'Czech' }
      ]} />
      <TextInput source="type" />
      <BooleanInput source="active" defaultValue={true} />
    </SimpleForm>
  </Create>
); 