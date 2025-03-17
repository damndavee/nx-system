import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        SpaceMono: require('../../assets/fonts/SpaceMonoRegular.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            console.log("✅ Fonts Loaded!");
            SplashScreen.hideAsync();
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
