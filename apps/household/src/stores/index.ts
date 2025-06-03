import { Action, ThunkAction, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import rootReducer from './rootReducer';
import { authListener } from './auth/auth.listeners';
import { appStartup } from './auth/auth.reducer';
import {  } from './auth/auth.thunk';
import { authApi } from './auth/auth.api';

const startupListener = createListenerMiddleware();

startupListener.startListening({
    actionCreator: appStartup,
    effect: async (action, listenerApi) => {
        listenerApi.dispatch(authApi.endpoints.authStateChanged.initiate());
    },
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).prepend(startupListener.middleware).prepend(authListener.middleware).concat(authApi.middleware),
})

store.dispatch(appStartup());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, undefined, Action>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;