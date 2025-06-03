// services/authApi.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserProfileQuery, UserProfile, AuthQueryParams, AuthQuery } from './auth.types';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        authStateChanged: builder.query<AuthQuery, void>({
            async queryFn() {
                return new Promise((resolve, reject) => {
                    const unsubscribe = auth().onAuthStateChanged(async (user) => {
                        try {
                            if (!user) {
                                resolve({ data: null });
                                return;
                            }
    
                            resolve({ data: user });

                        } catch (error: any) {
                            console.error("Error in authStateChangeListener:", error);
                            reject({ error: { message: error.message } });
                        } finally {
                            unsubscribe();
                        }
                    });
                });
            },
        }),
        getProfile: builder.query<UserProfileQuery, string>({
            async queryFn(uid) {
                try {
                    const doc = await firestore().collection('users').doc(uid).get();
                    const data = doc.data();

                    if(!data) {
                        return { data: null };
                    }
                    
                    return { data: data as UserProfile };
                } catch (error: any) {
                    return { error: { message: error.message } };
                }
            },
        }),
        signUp: builder.mutation<AuthQuery, AuthQueryParams>({
            async queryFn({ email, password }) {
                try {
                    const { user } = await auth().createUserWithEmailAndPassword(email, password);

                    await firestore().collection('users').doc(user.uid).set({
                        id: user.uid,
                        name: 'New User',
                        email: user.email || '',
                        username: `user_${user.uid.substring(0, 5)}`,
                        phoneNumber: '', 
                        avatarUrl: '',
                        termsAccepted: false,
                        isNewUser: true,
                        wasOnboardingShown: false,
                        profileCompleted: false,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    })

                    if(!user) {
                        return { error: { message: 'User not found' } };
                    }
                    
                    return { data: user };
                } catch (error: any) {

                    console.error('Error during sign-up:', error);

                    if (error.code === 'auth/email-already-in-use') {
                        return { error: { message : 'That email address is already in use!' }};
                    }

                    if (error.code === 'auth/invalid-email') {
                        return { error: { message : 'That email address is invalid!' }};
                    }

                    return { error: { message: error.message } };
                }
            },
        }),
        signIn: builder.mutation<AuthQuery, AuthQueryParams>({
            async queryFn({ email, password }) {
                try {
                    const { user } = await auth().signInWithEmailAndPassword(email, password);
                    const idTokenResult = await auth().currentUser?.getIdTokenResult();
                    const token = idTokenResult?.token;

                    if(!token) {
                        return { error: { message: 'Token not found' } };
                    }
                    
                    return { data: user };
                } catch (error: any) {
                    return { error: { message: error.message } };
                }
            },
        }),
        signOut: builder.mutation<null, void>({
            async queryFn() {
                try {
                    await auth().signOut();
                    return { data: null };
                } catch (error: any) {
                    return { error: { message: error.message } };
                }
            },
        })
    }),
});

export const {
    useAuthStateChangedQuery,
    useGetProfileQuery,
    useSignUpMutation,
    useSignInMutation,
    useSignOutMutation
} = authApi;
