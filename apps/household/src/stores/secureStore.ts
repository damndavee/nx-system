import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import * as Application from 'expo-application';
import { defaultKeychaninService } from './secureStore.keys';

const defaultOptions: SecureStore.SecureStoreOptions = {
    keychainService: defaultKeychaninService,
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY
}

export const getEncryptedValue = async (value: string) => {
    return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, value);
}

export const getStorageOptions = async (): Promise<SecureStore.SecureStoreOptions> => {
        return Application.getIosIdForVendorAsync().then((idForVendor: string | null) => ({
            ...defaultOptions,
            keychainService: idForVendor || defaultOptions.keychainService
        }))
        .catch(() => defaultOptions);
};

export const setItem = async (key: string, value: string): Promise<void> => {
    const options: SecureStore.SecureStoreOptions = await getStorageOptions();
    return SecureStore.setItemAsync(key, value, options);
};

export const getItem = async (key: string): Promise<string | null> => {
    const options: SecureStore.SecureStoreOptions = await getStorageOptions();
    return SecureStore.getItemAsync(key, options);
};

export const deleteItem = async (key: string): Promise<void> => {
    const options: SecureStore.SecureStoreOptions = await getStorageOptions();
    return SecureStore.deleteItemAsync(key, options);
};