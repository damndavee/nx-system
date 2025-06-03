import { comboUserPinIdKey } from "./keys";
import { deleteItem, getEncryptedValue, getItem, setItem } from "./secureStore";

const getComboUserPinId = async (): Promise<null | { userId: string, hash: string }> => {
    const combo = await getItem(comboUserPinIdKey);
    if (!combo) return null;
    return JSON.parse(combo)
}

const setComboUserPinId = async (pin: string, userId: string): Promise<void> => {
    const combo = `${pin}|${userId}`;
    const hash = await getEncryptedValue(combo);
    await setItem(comboUserPinIdKey, JSON.stringify({ userId, hash }));
}

const removePin = async (): Promise<void> => {
    await deleteItem(comboUserPinIdKey);
}

export { setComboUserPinId, getComboUserPinId, removePin };