import { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'expo-router';
import { Alert, Platform } from 'react-native';
import { addressSchema } from '../utils/validation';
import { useAppDispatch } from '../store/store';
import { setAddresses } from '../store/slices/addressesSlice';
import { addressService } from '../api/addressService';

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

const defaultInitialValues: AddressFormValues = {
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
};

export const useAddressForm = (
  initialValues: AddressFormValues = defaultInitialValues,
  addressId?: string
) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formik = useFormik<AddressFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: addressSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        let response;
        if (addressId) {
          response = await addressService.update(addressId, values);
        } else {
          response = await addressService.create(values);
        }

        if (response && response.addresses) {
          dispatch(setAddresses(response.addresses));
          router.back();
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error: any) {
        console.error('Failed to save address:', error);
        const errorMessage = error.data?.message || error.message || 'Something went wrong while saving the address.';
        if (Platform.OS !== 'web') {
          Alert.alert('Save Failed', errorMessage);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const handleDelete = async () => {
    if (!addressId) return;

    const performDelete = async () => {
      try {
        setIsDeleting(true);
        const response = await addressService.delete(addressId);

        if (response && response.addresses) {
          dispatch(setAddresses(response.addresses));
          router.back();
        } else {
          throw new Error('Failed to delete address');
        }
      } catch (error: any) {
        console.error('Failed to delete address:', error);
        const errorMessage = error.data?.message || error.message || 'Something went wrong while deleting the address.';
        if (Platform.OS !== 'web') {
          Alert.alert('Deletion Failed', errorMessage);
        }
      } finally {
        setIsDeleting(false);
      }
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete this address?')) {
        await performDelete();
      }
    } else {
      Alert.alert(
        'Delete Address',
        'Are you sure you want to delete this address? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Delete', 
            style: 'destructive',
            onPress: performDelete
          },
        ]
      );
    }
  };

  return {
    formik,
    handleDelete,
    isDeleting,
    loading
  };
};

