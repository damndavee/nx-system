import { createAsyncThunk } from "@reduxjs/toolkit";
import { PinDataPayload, ResolveRedirectPayload, SubmitPinResult } from "./auth.types";
import { setScreen, setUserProfile, setInitialPin } from "./auth.reducer";
import { getComboUserPinId, removePin, setComboUserPinId } from "../secureStore/service";
import { RootState } from "..";
import { getEncryptedValue } from "../secureStore";
import { authApi } from "./auth.api";

export const loginByPinThunk = createAsyncThunk<SubmitPinResult, PinDataPayload, { state: RootState }>(
    'auth/loginByPin',
    async (data, { rejectWithValue, fulfillWithValue }) => {
        const storedHash = await getComboUserPinId();
        const candidateHash = await getEncryptedValue(`${data.pin}|${data.userId}`);

        if (storedHash?.hash === candidateHash) {
            return fulfillWithValue({
                message: 'PIN accepted',
            });
        }

        return rejectWithValue({
            message: 'Incorrect PIN.',
        });
    }
)

export const setupPinThunk = createAsyncThunk<SubmitPinResult, PinDataPayload, { state: RootState }>(
    'auth/submitPin',
    async (data, { dispatch, rejectWithValue, fulfillWithValue, getState }) => {
        const initialPin = getState().authReducer.initialPin;

        if(!initialPin) {
            dispatch(setInitialPin(data.pin));
            return fulfillWithValue({
                message: 'PIN successfully initialized',
                canProceed: false,
            });;
        }

        if(data.pin !== initialPin) {
            return rejectWithValue({
                message: 'PINs do not match. Please try again.',
            });
        }

        await setComboUserPinId(data.pin, data.userId);
        return fulfillWithValue({
            message: 'PIN successfully set',
            canProceed: true,
        });
    }
);

export const signOutThunk = createAsyncThunk<void, void>(
    'auth/signOut',
    async (_, { dispatch }) => {
        await dispatch(authApi.endpoints.signOut.initiate());
        await removePin();
    }
);

export const resolveRedirectScreenThunk = createAsyncThunk<void, ResolveRedirectPayload>(
    'auth/resolveRedirectScreen',
    async (
        payload,
        { dispatch }
    ) => {
        const { user, userProfile } = payload;
        
        const combo = await getComboUserPinId();
        const hasPin = combo && combo.userId === user?.uid;

        let screen = '/';

        switch (true) {
            case !!user && hasPin:
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
                screen = '/';
        }

        dispatch(setUserProfile(userProfile));
        dispatch(setScreen(screen));
    }
);