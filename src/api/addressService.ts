import { api } from './apiClient';
import { Address } from '../store/slices/addressesSlice';

/**
 * Service for address-related API operations
 */
export const addressService = {
  /**
   * Fetch all addresses for the current user
   */
  getAll: () => api.get<{ addresses: Address[] }>('/user/addresses'),

  /**
   * Add a new address
   */
  create: (addressData: any) => api.post<{ addresses: Address[] }>('/user/address', addressData),

  /**
   * Update an existing address
   */
  update: (id: string, addressData: any) => api.post<{ addresses: Address[] }>(`/user/address/${id}`, addressData),

  /**
   * Delete an address
   */
  delete: (id: string) => api.delete<{ addresses: Address[] }>(`/user/address/${id}`),

  /**
   * Set an address as default
   */
  setDefault: (id: string) => api.post<{ addresses: Address[] }>(`/user/address/${id}/default`, {})
};
