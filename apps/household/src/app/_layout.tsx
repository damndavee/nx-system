import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        SpaceMono: require('../../assets/fonts/SpaceMonoRegular.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();

            const unsubscribe = auth().onAuthStateChanged((user) => {
                if (user) {
                  router.replace('/(onboarding)/pin');
                } else {
                  router.replace('/');
                }
              });
        
              return () => unsubscribe();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor='#fff' style='dark' />
            <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
    );
}
