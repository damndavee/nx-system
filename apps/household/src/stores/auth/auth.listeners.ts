import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from './auth.api';
import { resolveRedirectScreenThunk } from './auth.thunk';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const authListener = createListenerMiddleware();

authListener.startListening({
    matcher: isAnyOf(
        authApi.endpoints.authStateChanged.matchFulfilled,
        authApi.endpoints.signIn.matchFulfilled,
        authApi.endpoints.signUp.matchFulfilled
    ),
    effect: async (action, listenerApi) => {
        const user = action.payload as FirebaseAuthTypes.User | null;
        const userProfile = (await listenerApi.dispatch(authApi.endpoints.getProfile.initiate(user?.uid ?? ''))).data;

        await listenerApi.dispatch(resolveRedirectScreenThunk({ user, userProfile }));
    },
})