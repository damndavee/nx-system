import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteItem, getEncryptedValue, getItem, setItem } from "../secureStore";
import { comboUserPinIdKey, } from "../secureStore/keys";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { UserProfile } from "./auth.types";
import { setScreen, setUserProfile } from "./auth.reducer";

export const getPinEnabledByThunk = createAsyncThunk<null | string, string>(
    'auth/getPinEnabledBy',
    async (userId, { rejectWithValue }) => {
        const combo = await getItem(comboUserPinIdKey);

        if (!combo) {
            rejectWithValue('No pin enabled by user found');
            return null;
        }
        
        const [pin, id] = combo.split('|');

        if(id !== userId) {
            rejectWithValue('User ID does not match');
            return null
        }

        return pin;
    }
);

export const setComboUserPinIdThunk = createAsyncThunk<void, string>(
    'auth/setComboUserPinId',
    async (combo: string) => {
        const encryptedCombo = await getEncryptedValue(combo);
        await setItem(comboUserPinIdKey, encryptedCombo);
    }
);

export const removePinThunk = createAsyncThunk<void, void>(
    'auth/removePin',
    async () => {
        await deleteItem(comboUserPinIdKey);
    }
);

export const resolveRedirectScreenThunk = createAsyncThunk(
    'auth/resolveRedirectScreen',
    async (
        payload: { user: FirebaseAuthTypes.User | null; userProfile: UserProfile | null | undefined },
        { dispatch }
    ) => {
        const { user, userProfile } = payload;
        const pin = dispatch(getPinEnabledByThunk(user?.uid ?? ""));

        let screen = '/welcome';

        switch (true) {
            case !!user && !!pin:
                screen = '/(auth)/pin';
                break;
            case !!user && userProfile?.isNewUser:
                screen = '/(onboarding)/setup-pin';
                break;
            case userProfile?.isNewUser:
                screen = '/(onboarding)/welcome';
                break;
            case userProfile?.wasOnboardingShown:
                screen = '/(onboarding)/pin';
                break;
            default:
                screen = '/welcome';
        }

        dispatch(setUserProfile(userProfile));
        dispatch(setScreen(screen));
    }
);