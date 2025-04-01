import { Text, View, Pressable, StyleSheet } from 'react-native'
import { useRef, useEffect } from 'react'
import { OtpInput, OtpInputRef } from "react-native-otp-entry";
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { lockSvgMarkup } from '../../../components/markups';
import { Stack } from 'expo-router';
import { PIN_BUTTONS } from '../../../data/pin.data';
import { PinButton } from '../components/PinButton';
import { Handlers } from '../types';
import { usePinKeyboard } from '../hooks/usePinKeyboard';

const PinScreen = () => {
    const otpInputRef = useRef<OtpInputRef>(null);
    const { insertPin, isPinVisible, pin, removePin, runBiometrics, togglePinVisibility } = usePinKeyboard();

    useEffect(() => {
        otpInputRef.current?.setValue(pin);
    }, [pin])

    const mapKeyboardEvent = (event: Handlers, value: string | null) => {
        console.log(event, value);
        const map = {
            'insert': () => insertPin(value ?? ''),
            'backspace': removePin,
            'biometrics': runBiometrics
        }

        return map[event]();
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View className='p-4 items-center justify-between flex-1'>
                <View className='p-4 items-center'>
                    <View className='items-center justify-center gap-20'>
                        <View className='items-center justify-center'>
                            <SvgXml xml={lockSvgMarkup} width="150" height="150" />
                            <Text className='font-semibold text-3xl'>Enter Your pin</Text>
                        </View>
                        <View className='gap-10 items-center justify-center'>
                            <OtpInput
                                numberOfDigits={5}
                                secureTextEntry={isPinVisible}
                                theme={{ ...styles }}
                                ref={otpInputRef}
                                autoFocus={false}
                            />
                            <View className='flex-row items-center justify-between w-full'>
                                <Pressable onPress={togglePinVisibility}>
                                    <Text>Forgot PIN</Text>
                                </Pressable>
                                <Pressable onPress={togglePinVisibility} className='rounded-full bg-[#ddd] active:bg-[#ccc] p-2'>
                                    <Ionicons name={`eye-${isPinVisible ? 'off-outline' : 'outline'}`} size={24} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='w-full aspect-square grid grid-cols-3'>
                    {PIN_BUTTONS.map((row, rowIndex) => (
                        <View className={`flex-row justify-center flex-1 w-full ${rowIndex < 3 && 'border-b-hairline'}`} key={rowIndex}>
                            {row.map((button, index) => (
                                <PinButton
                                    key={index}
                                    label={button.label}
                                    event={button.event as Handlers}
                                    onPress={() => mapKeyboardEvent(button.event as Handlers, button.value)}
                                    className={(index + 1) % 3 !== 0 ? 'border-r-hairline' : ''}
                                />
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </>
    )
}

export { PinScreen };

const styles = StyleSheet.create({
    pinCodeTextStyle: {
        fontSize: 16,
    },
    placeholderTextStyle: {
        width: 20,
        backgroundColor: 'red',
        height: 20
    },
    pinCodeContainerStyle: {
        borderRadius: 10,
        width: 50,
        height: 50,
        borderWidth: 0,
        backgroundColor: '#ddd',
    },
    containerStyle: {
        pointerEvents: 'none',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
    },   
})
