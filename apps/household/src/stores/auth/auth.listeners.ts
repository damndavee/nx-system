import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from './auth.api';
import { resolveRedirectScreenThunk } from './auth.thunk';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { getComboUserPinId } from '../secureStore/service';

export const authListener = createListenerMiddleware();

authListener.startListening({
    matcher: isAnyOf(
        authApi.endpoints.authStateChanged.matchFulfilled,
        authApi.endpoints.signIn.matchFulfilled,
        authApi.endpoints.signUp.matchFulfilled
    ),
    effect: async (action, listenerApi) => {
        const user = action.payload as FirebaseAuthTypes.User | undefined;
        const combo = await getComboUserPinId();

        if(authApi.endpoints.authStateChanged.matchFulfilled(action) && user && !combo) {
            await listenerApi.dispatch(authApi.endpoints.signOut.initiate());
            return;
        }
        
        const userProfile = (await listenerApi.dispatch(authApi.endpoints.getProfile.initiate(user?.uid ?? ''))).data;
                
        if(!userProfile) {
            return;
        }

        await listenerApi.dispatch(resolveRedirectScreenThunk({ user, userProfile }));
    },
})