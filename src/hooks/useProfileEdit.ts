import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../store/store';
import { updateProfile } from '../store/slices/userSlice';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Must be at least 10 digits')
    .required('Phone number is required'),
});

export const useProfileEdit = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userProfile = useAppSelector((state) => state.user.userProfile);

  const formik = useFormik({
    initialValues: {
      name: userProfile?.name || '',
      email: userProfile?.email || '',
      phone: userProfile?.phone || '',
      avatar: userProfile?.avatar || '',
    },
    validationSchema: ProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        dispatch(updateProfile(values));
        Alert.alert('Success', 'Profile updated successfully');
        router.back();
      } catch (error) {
        Alert.alert('Error', 'Failed to update profile');
      }
    },
  });

  const handleVerifyEmail = () => {
    Alert.alert('Verify Email', `Verification link sent to ${formik.values.email}`);
  };

  const handleVerifyPhone = () => {
    Alert.alert('Verify Phone', `OTP sent to ${formik.values.phone}`);
  };

  const handleImagePicker = () => {
    // This would typically use expo-image-picker
    Alert.alert('Image Picker', 'Open gallery to select image');
  };

  return {
    formik,
    handleVerifyEmail,
    handleVerifyPhone,
    handleImagePicker,
    isLoading: formik.isSubmitting
  };
};
