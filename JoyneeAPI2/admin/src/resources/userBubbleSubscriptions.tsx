import React from 'react';
import { List, Datagrid, TextField, NumberField, BooleanField, DateField, Edit, Create, Show, SimpleForm, TextInput, NumberInput, BooleanInput, ShowButton, EditButton, DeleteButton } from 'react-admin';

export const UserBubbleSubscriptionList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <NumberField source="userId" />
      <NumberField source="bubbleId" />
      <BooleanField source="active" />
      <BooleanField source="acceptMatches" />
      <NumberField source="weight" />
      <DateField source="createdAt" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const UserBubbleSubscriptionShow = () => (
  <Show>
    <TextField source="id" />
    <NumberField source="userId" />
    <NumberField source="bubbleId" />
    <BooleanField source="active" />
    <BooleanField source="acceptMatches" />
    <NumberField source="weight" />
    <DateField source="createdAt" />
    <DateField source="updatedAt" />
  </Show>
);

export const UserBubbleSubscriptionEdit = () => (
  <Edit>
    <SimpleForm>
      <NumberInput source="userId" disabled />
      <NumberInput source="bubbleId" disabled />
      <BooleanInput source="active" />
      <BooleanInput source="acceptMatches" />
      <NumberInput source="weight" />
    </SimpleForm>
  </Edit>
);

export const UserBubbleSubscriptionCreate = () => (
  <Create>
    <SimpleForm>
      <NumberInput source="userId" />
      <NumberInput source="bubbleId" />
      <BooleanInput source="active" defaultValue={true} />
      <BooleanInput source="acceptMatches" defaultValue={true} />
      <NumberInput source="weight" defaultValue={1} />
    </SimpleForm>
  </Create>
);
