import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios/dist/axios';
import { Platform } from 'react-native';

/**
 * In React Native development:
 * - Web/iOS Simulator: 'localhost' works.
 * - Android Emulator: '10.0.2.2' is the alias for the host machine's localhost.
 */
const getBaseUrl = () => {
  const BASE_PATH = '/ordering';
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return `http://10.0.2.2:5000${BASE_PATH}`;
    }
    return `http://localhost:5000${BASE_PATH}`;
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
 * @param path - The endpoint path (e.g., '/user/profile')
 * @param method - HTTP Method (GET, POST, PUT, DELETE, etc.)
 * @param data - Request body data (for POST/PUT)
 * @param config - Additional Axios configuration
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
    };
    
    console.error('API Request Failed:', errorDetails);
    
    // You can implement custom error handling here (e.g., refreshing tokens)
    throw errorDetails;
  }
};

// Shorthand methods for convenience
export const api = {
  get: <T = any>(path: string, config?: AxiosRequestConfig) => 
    request<T>(path, 'GET', null, config),
    
  post: <T = any>(path: string, data?: any, config?: AxiosRequestConfig) => 
    request<T>(path, 'POST', data, config)
};

export default apiClient;
