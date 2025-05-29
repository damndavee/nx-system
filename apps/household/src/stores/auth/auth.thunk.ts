import { createAsyncThunk } from "@reduxjs/toolkit";
import { PinDataPayload, ResolveRedirectPayload, SubmitPinResult } from "./auth.types";
import { setScreen, setUserProfile, setInitialPin } from "./auth.reducer";
import { getComboUserPinId, setComboUserPinId } from "../secureStore/service";
import { RootState } from "..";

export const submitPinThunk = createAsyncThunk<SubmitPinResult, PinDataPayload, { state: RootState }>(
    'auth/submitPin',
    async (data, { dispatch, rejectWithValue, fulfillWithValue, getState }) => {
        const storedPin = await getComboUserPinId(data.userId);
        const initialPin = getState().authReducer.initialPin;

        if(!initialPin) {
            dispatch(setInitialPin(data.pin));
        }

        if(!storedPin) {
            await setComboUserPinId(`${data.pin}|${data.userId}`);
            return fulfillWithValue({
                message: 'PIN successfully set',
                isNewPin: true,
            });
        }

        if (data.pin === storedPin) {
            return fulfillWithValue({
                message: 'PIN accepted',
                isNewPin: false,
            });
        }

        return rejectWithValue({
            message: 'Incorrect PIN.',
            isNewPin: false,
        });
    }
);

export const resolveRedirectScreenThunk = createAsyncThunk<void, ResolveRedirectPayload>(
    'auth/resolveRedirectScreen',
    async (
        payload,
        { dispatch }
    ) => {
        const { user, userProfile } = payload;
        const pin = getComboUserPinId(user?.uid ?? "");

        let screen = '/';

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
                screen = '/';
        }

        dispatch(setUserProfile(userProfile));
        dispatch(setScreen(screen));
    }
);