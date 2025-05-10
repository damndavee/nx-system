import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { signOut } from '../services/firebase/auth';
import { AuthProvider } from '../context/AuthContext';
import { store } from '../stores';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        SpaceMono: require('../../assets/fonts/SpaceMonoRegular.ttf'),
    });

    const queryClient = new QueryClient({
        defaultOptions: { 
            queries: { 
                retry: 3,
                gcTime: 10 * 60 * 1000,
                staleTime: Infinity  
            } 
        },
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
            // signOut()
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor='#fff' style='dark' />
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <AuthProvider>
                        <Stack screenOptions={{ headerShown: false }} />
                    </AuthProvider>
                </Provider>
            </QueryClientProvider>
        </SafeAreaProvider>
    );
}
