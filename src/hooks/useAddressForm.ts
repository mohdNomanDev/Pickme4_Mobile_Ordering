import { useFormik } from 'formik';
import { useRouter } from 'expo-router';
import { addressSchema } from '../utils/validation';

export interface AddressFormValues {
  label: string;
  buildingNumber: string;
  streetName: string;
  district: string;
  city: string;
  region: string;
  postalCode: string;
  secondaryNumber: string;
  deliveryInstructions: string;
  isDefault: boolean;
}

export const useAddressForm = () => {
  const router = useRouter();

  const formik = useFormik<AddressFormValues>({
    initialValues: {
      label: 'Home',
      buildingNumber: '',
      streetName: '',
      district: '',
      city: '',
      region: '',
      postalCode: '',
      secondaryNumber: '',
      deliveryInstructions: '',
      isDefault: false,
    },
    validationSchema: addressSchema,
    onSubmit: (values) => {
      console.log('Saving address data:', values);
      // Simulate successful save and go back
      router.back();
    },
  });

  return formik;
};
