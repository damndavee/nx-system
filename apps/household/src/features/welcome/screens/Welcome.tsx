import { router } from 'expo-router';
import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from "react-native-svg";
import { welcomeSvgMarkup } from '../../../components/markups';

// {
//     "tokens": {
//       "white": "#fff",
//       "dark_gray": "#3f3d56",
//       "light_gray": "#e6e6e6",
//       "purple": "#6c63ff",
//       "light_purple": "#f2f2f2",
//       "pink": "#ffb8b8",
//       "black": "#2f2e41"
//     }
// }

const WelcomeScreen = () => {
    return (
        <SafeAreaView className='flex-1'>
            <View className="flex-1 items-center bg-white p-8">             
                <SvgXml xml={welcomeSvgMarkup} width="300" height="300" />
                <View className='gap-2 mt-2'>
                    <Text className="text-4xl font-bold text-center text-black">
                        Household
                    </Text>
                    <Text className="text-gray-500 text-center">
                        Zarządzaj domem, obowiązkami i planami. Połącz się z bliskimi w jednej aplikacji.
                    </Text>
                </View>

                <View className="flex-row w-full bg-gray-200 rounded-lg absolute bottom-10">
                    <Pressable onPress={() => router.navigate('(auth)/signup')} className="bg-black align-center py-4 rounded-lg flex-1">
                        <Text className="text-white font-semibold text-center">Stwórz konto</Text>
                    </Pressable>
                    <Pressable onPress={() => router.navigate('(auth)/signin')} className="align-center py-4 rounded-lg flex-1">
                        <Text className="text-black font-semibold text-center">Zaloguj</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export { WelcomeScreen };