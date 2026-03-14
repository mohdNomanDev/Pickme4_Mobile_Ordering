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

