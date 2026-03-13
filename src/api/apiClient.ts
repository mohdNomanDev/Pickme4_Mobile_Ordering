import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios/dist/axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * In React Native development:
 * - Web/iOS Simulator: 'localhost' works.
 * - Android Emulator: '10.0.2.2' is the alias for the host machine's localhost.
 * - Physical Device (Expo Go): Needs the machine's local IP (e.g., 192.168.x.x).
 */
const getBaseUrl = () => {
  const BASE_PATH = '/ordering';
  const PORT = '5000';

  if (__DEV__) {
    // Attempt to extract the IP address of the machine running the Expo packager
    const hostUri = Constants.expoConfig?.hostUri;
    const debuggerHost = hostUri ? hostUri.split(':')[0] : null;

    if (debuggerHost) {
      return `http://${debuggerHost}:${PORT}${BASE_PATH}`;
    }

    // Fallbacks for specific environments if hostUri is unavailable
    if (Platform.OS === 'android') {
      return `http://10.0.2.2:${PORT}${BASE_PATH}`;
    }
    return `http://localhost:${PORT}${BASE_PATH}`;
  }

  // Production URL
  return `https://api.yourdomain.com${BASE_PATH}`;
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Generic API request handler
 */
export const request = async <T = any>(
  path: string,
  method: Method = 'GET',
  data: any = null,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient({
      url: path,
      method,
      data,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    const errorDetails = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      path: path,
      fullUrl: `${apiClient.defaults.baseURL}${path}`
    };
    
    console.error('API Request Failed:', errorDetails);
    throw errorDetails;
  }
};

export const api = {
  get: <T = any>(path: string, config?: AxiosRequestConfig) => 
    request<T>(path, 'GET', null, config),
    
  post: <T = any>(path: string, data?: any, config?: AxiosRequestConfig) => 
    request<T>(path, 'POST', data, config)
};

export default apiClient;
