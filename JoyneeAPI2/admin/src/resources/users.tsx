import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  BooleanField,
  DateField,
  Edit,
  Create,
  Show,
  SimpleForm,
  TextInput,
  BooleanInput,
  DateInput,
  ShowButton,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="authId" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="email" />
      <BooleanField source="active" />
      <DateField source="createdAt" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const UserShow = () => (
  <Show>
    <TextField source="id" />
    <TextField source="firstName" />
    <TextField source="lastName" />
    <EmailField source="email" />
    <TextField source="avatar" />
    <TextField source="personality" />
    <TextField source="bio" />
    <BooleanField source="active" />
    <DateField source="birthDate" />
    <DateField source="createdAt" />
    <DateField source="updatedAt" />
  </Show>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm sanitizeEmptyValues={false}>
      <TextField source="authId" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="email" />
      <TextInput source="avatar" />
      <TextInput source="personality" multiline rows={3} />
      <TextInput source="bio" multiline rows={3} />
      <DateInput source="birthDate" />
      <BooleanInput source="active" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="authId" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="email" />
      <TextInput source="avatar" />
      <TextInput source="personality" multiline rows={3} />
      <TextInput source="bio" multiline rows={3} />
      <DateInput source="birthDate" />
      <BooleanInput source="active" defaultValue={true} />
    </SimpleForm>
  </Create>
); 