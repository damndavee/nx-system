import { Text, View, Pressable, StyleSheet } from 'react-native'
import { OtpInput } from "react-native-otp-entry";
import { SvgXml } from 'react-native-svg';
import { lockSvgMarkup } from '../../../components/markups';
import { Stack, usePathname } from 'expo-router';
import { PIN_BUTTONS } from '../../../data/pin.data';
import { PinButton } from '../components/PinButton';
import { Handlers } from '../types';
import { usePinKeyboard } from '../hooks/usePinKeyboard';
import { SafeAreaView } from 'react-native-safe-area-context';

export type PinPasswordScreenProps = {
    onSubmit: (pin: string) => void;
    title: string;
    subtitle: string;
    error: string | null
}

const PinPasswordScreen = (props: PinPasswordScreenProps) => {
    const { onKeyboardEvent, otpInputRef, resetPin } = usePinKeyboard();

    const pathname = usePathname();

    const handlePinSubmit = (pin: string) => {
        props.onSubmit(pin);
        resetPin()
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView className='items-center justify-between flex-1 bg-[#f5f4f9]'>
                <View className='items-center justify-center gap-10 bg-white rounded-b-[25] flex-1 w-full'>
                    {pathname.includes('setup') && (
                        <Pressable className='absolute right-5 top-5'>
                            <Text className='text-xl text-[#6c63ff]'>Pomiń</Text>
                        </Pressable>
                    )}
                    <View className='items-center justify-center w-3/4'>
                        <SvgXml xml={lockSvgMarkup} width="200" height="200" />
                        <Text className='font-semibold text-xl text-center'>{props.title}</Text>
                        <Text className='font-light text-md text-center'>{props.subtitle}</Text>
                    </View>
                    <View className='gap-3'>
                        <OtpInput
                            numberOfDigits={4}
                            onFilled={handlePinSubmit}
                            theme={{ ...styles }}
                            ref={otpInputRef}
                            autoFocus={false}
                        />
                        {props.error && <Text className="text-red-500 text-center">{props.error}</Text>}
                    </View>
                </View>
                <View className='w-full aspect-[7/6] grid grid-cols-3 p-3'>
                    {PIN_BUTTONS.map((row, rowIndex) => (
                        <View className={`flex-row justify-center flex-1 w-full`} key={rowIndex}>
                            {row.map((button, index) => (
                                <PinButton
                                    key={index}
                                    label={button.label}
                                    event={button.event as Handlers}
                                    onPress={() => onKeyboardEvent(button.event as Handlers, button.value)}
                                />
                            ))}
                        </View>
                    ))}
                </View>
            </SafeAreaView>
        </>
    )
}

export { PinPasswordScreen };

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
