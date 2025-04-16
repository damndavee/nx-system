import { deleteItem, getEncryptedValue, getItem, setItem } from "../secureStore";
import { pinEnabledByKey, userPinKey } from "../secureStore.keys";

export const getPinEnabledBy = async (userId: string): Promise<boolean> => {
    const [encryptedUserId, pinEnabledBy] = await Promise.all([getEncryptedValue(userId), getItem(pinEnabledByKey)]);
    return encryptedUserId === pinEnabledBy;
};

export const setPinEnabledBy = async (userId: string): Promise<void> => {
    const encryptedUserId: string = await getEncryptedValue(userId);
    setItem(pinEnabledByKey, encryptedUserId);
}

export const setPin = async (pin: string): Promise<void> => setItem(userPinKey, pin);
export const getPin = async (): Promise<string | null> => getItem(userPinKey);
export const removePin = async (): Promise<void> => deleteItem(userPinKey);