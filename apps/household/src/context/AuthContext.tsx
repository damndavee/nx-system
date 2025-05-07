/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, ReactNode, useEffect } from 'react';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { authStateChangeListener, signInWithEmail, signUpWithEmail } from '../services/firebase/auth';
import { UserProfile } from '../services/firebase/types';
import { router } from 'expo-router';
import { getPin } from '../stores/auth/auth.service';

interface AuthContextProps {
    currentUser: FirebaseAuthTypes.User | null | undefined;
    currentProfile: UserProfile | null | undefined;
    signin: (email: string, password: string) => void;
    signup: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const currentUserQuery = useQuery({
        queryKey: ['authStateChangeListener'],
        queryFn: async () => await authStateChangeListener(),
        staleTime: Infinity,
    })

    const pinQuery = useQuery({
        queryKey: ['getPin'],
        queryFn: async () => await getPin(),
        staleTime: Infinity,
    })

    const signin = async (email: string, password: string) => {
        try {
            await signInWithEmail(email, password);
            await currentUserQuery.refetch();
        } catch (error) {
            console.error("Error during signin or refetch:", error);
        }
    };

    const signup = async (email: string, password: string) => {
        try {
            await signUpWithEmail(email, password);
            await currentUserQuery.refetch();
        } catch (error) {
            console.error("Error during signup or refetch:", error);
        }
    };
    
    useEffect(() => {
        if (currentUserQuery.isSuccess && pinQuery.isSuccess) {
            let route = '/welcome';
    
            const { user, userProfile } = currentUserQuery.data || {};
    
            switch (true) {
                case !!user && !!pinQuery.data:
                    route = '/(auth)/pin';
                    break;
                case !!user && userProfile?.isNewUser:
                    route = '/(onboarding)/setup-pin'
                    break;
                case userProfile?.isNewUser:
                    route = '/(onboarding)/welcome';
                    break;
                case userProfile?.wasOnboardingShown:
                    route = '/(onboarding)/pin';
                    break;
                default: 
                    route = '/welcome';
                    break;
            }
    
            router.replace(route);
        }
    }, [currentUserQuery.isSuccess, currentUserQuery.data])

    const logout = () => {
        //TODO: Add logout logic here
    };

    return (
        <AuthContext.Provider value={{
            currentUser: null,
            currentProfile: null,
            signin,
            signup,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};