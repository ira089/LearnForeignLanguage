import * as yup from 'yup';

export const schemaRegistr = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(32, 'Maximum name length is 32 symbols')
    .required('Name is required'),
  email: yup
    .string()
    .matches(
      /^[^@]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/,
      'Invalid email format'
    )
    .required('Email is required'),
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters')
    .max(64, 'Maximum password length is 64 symbols')
    .matches(
        /^[\S]+$/,
        'Invalid password format')
    .required('Password is required'), 
});

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[^@]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/,
      'Invalid email format'
    )
    .required('Email is required'),
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters')
    .max(64, 'Maximum password length is 64 symbols')
    .matches(
        /^[\S]+$/,
        'Invalid password format')
    .required('Password is required'), 
});

export const schemaBook = yup.object().shape({
  fullName: yup
    .string()
    .matches(/^[a-zA-Z]+\s[a-zA-Z]+$/, 'Full Name must contain exactly two words separated by a space')
    .min(4, 'Name must be at least 5 characters')
    .max(32, 'Maximum name length is 32 symbols')
    .required('Full Name is required'),
  email: yup
    .string()
    .matches( /^[^@]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/,'Invalid email format')
    .required('Email is required'),
    phone: yup
    .string()
    .min(4, 'Password must be at least 4 characters')
    .max(64, 'Maximum password length is 64 symbols')
    .matches(/^[0-9]{10}$/, 'Phone Number must be exactly 10 digits')
    .required('Phone number is required'), 
});

