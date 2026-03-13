import * as Yup from 'yup';

/**
 * Standard Address Validation Schema
 * This can be used as a base for formik validation across the app.
 */
export const addressSchema = Yup.object().shape({
  label: Yup.string()
    .required('Label is required (e.g., Home, Work)')
    .min(2, 'Label must be at least 2 characters'),
  
  buildingNumber: Yup.string()
    .required('Building number is required'),
  
  streetName: Yup.string()
    .required('Street name is required'),
  
  district: Yup.string()
    .required('District is required'),
  
  city: Yup.string()
    .required('City is required'),
  
  region: Yup.string()
    .required('Region is required'),
  
  postalCode: Yup.string()
    .matches(/^\d+$/, 'Postal code must be numeric')
    .required('Postal code is required'),
  
  secondaryNumber: Yup.string()
    .matches(/^\d+$/, 'Secondary number must be numeric'),
  
  deliveryInstructions: Yup.string()
    .max(250, 'Instructions must be less than 250 characters'),
  
  isDefault: Yup.boolean(),
});

/**
 * Common regex patterns
 */
export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

/**
 * Auth Schemas example
 */
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
