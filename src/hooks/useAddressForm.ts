import { useFormik } from 'formik';
import { useRouter } from 'expo-router';
import { addressSchema } from '../utils/validation';
import { api } from '../api/apiClient';

export interface AddressFormValues {
  label: string;
  shortAddress: string;
  buildingNumber: string;
  streetName: string;
  district: string;
  city: string;
  region: string;
  postalCode: string;
  secondaryNumber: string;
  buildingName: string;
  apartmentNumber: string;
  floor: string;
  landmark: string;
  latitude: number;
  longitude: number;
  deliveryInstructions: string;
  isDefault: boolean;
}

export const useAddressForm = () => {
  const router = useRouter();

  const formik = useFormik<AddressFormValues>({
    initialValues: {
      label: 'Home',
      shortAddress: '',
      buildingNumber: '',
      streetName: '',
      district: '',
      city: '',
      region: '',
      postalCode: '',
      secondaryNumber: '',
      buildingName: '',
      apartmentNumber: '',
      floor: '',
      landmark: '',
      latitude: 0,
      longitude: 0,
      deliveryInstructions: '',
      isDefault: false,
    },
    validationSchema: addressSchema,
    onSubmit: async (values) => {
      try {
        console.log('Saving address data:', values);
        await api.post('/user/address', values);
        router.back();
      } catch (error) {
        console.error('Failed to save address:', error);
        // Error handling could be added here, e.g., set status for global form error
      }
    },
  });

  return formik;
};
