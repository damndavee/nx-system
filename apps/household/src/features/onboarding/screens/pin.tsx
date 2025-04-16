import { Text, View, Pressable, StyleSheet } from 'react-native'
import { useRef, useEffect } from 'react'
import { OtpInput, OtpInputRef } from "react-native-otp-entry";
import { SvgXml } from 'react-native-svg';
import { lockSvgMarkup } from '../../../components/markups';
import { Stack } from 'expo-router';
import { PIN_BUTTONS } from '../../../data/pin.data';
import { PinButton } from '../components/PinButton';
import { Handlers } from '../types';
import { usePinKeyboard } from '../hooks/usePinKeyboard';
import { SafeAreaView } from 'react-native-safe-area-context';

const PinScreen = () => {
    const otpInputRef = useRef<OtpInputRef>(null);
    const { isPinVisible, pin, disabled, submitPin, keyboardEvent } = usePinKeyboard();

    useEffect(() => {
        otpInputRef.current?.setValue(pin)
    }, [pin])

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView className='items-center justify-between flex-1 bg-[#f5f4f9]'>
                <View className='items-center justify-center gap-10 bg-white rounded-b-[25] flex-1 w-full'>
                    <Pressable className='absolute right-5 top-5'>
                        <Text className='text-xl text-[#6c63ff]'>Pomiń</Text>
                    </Pressable>
                    <View className='items-center justify-center w-3/4'>
                        <SvgXml xml={lockSvgMarkup} width="200" height="200" />
                        <Text className='font-semibold text-xl text-center'>Ustaw swój Pin, którym będziesz logować się do aplikacji.</Text>
                    </View>
                    <OtpInput
                        numberOfDigits={4}
                        onFilled={submitPin}
                        onTextChange={(text) => console.log("Text: ", text)}
                        secureTextEntry={isPinVisible}
                        theme={{ ...styles }}
                        ref={otpInputRef}
                        autoFocus={false}
                        disabled={disabled}
                    />
                </View>
                <View className='w-full aspect-[7/6] grid grid-cols-3 p-3'>
                    {PIN_BUTTONS.map((row, rowIndex) => (
                        <View className={`flex-row justify-center flex-1 w-full`} key={rowIndex}>
                            {row.map((button, index) => (
                                <PinButton
                                    key={index}
                                    label={button.label}
                                    event={button.event as Handlers}
                                    onPress={() => keyboardEvent(button.event as Handlers, button.value)}
                                />
                            ))}
                        </View>
                    ))}
                </View>
            </SafeAreaView>
        </>
    )
}

export { PinScreen };

const styles = StyleSheet.create({
    pinCodeTextStyle: {
        fontSize: 20,
    },
    placeholderTextStyle: {
        width: 20,
        backgroundColor: 'red',
        height: 20
    },
    pinCodeContainerStyle: {
        borderRadius: 10,
        width: 60,
        height: 60,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderColor: '#e4e1f2',
        backgroundColor: '#f6f4fc',
    },
    containerStyle: {
        pointerEvents: 'none',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
    },   
})
