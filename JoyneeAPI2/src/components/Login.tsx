import React from 'react';
import { Login, LoginForm } from 'react-admin';
import { TextInput } from 'react-admin';

const CustomLoginForm = () => (
  <LoginForm>
    <TextInput 
      source="username" 
      label="Email" 
      type="email" 
      autoComplete="email"
      validate={required()}
    />
    <TextInput 
      source="password" 
      label="Password" 
      type="password" 
      autoComplete="current-password"
      validate={required()}
    />
  </LoginForm>
);

const required = () => (value: any) => {
  if (!value) {
    return 'This field is required';
  }
  return undefined;
};

const CustomLogin = () => (
  <Login loginForm={<CustomLoginForm />} />
);

export default CustomLogin; 