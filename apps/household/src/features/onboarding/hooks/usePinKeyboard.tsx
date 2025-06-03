import { useEffect, useRef, useState } from 'react'; 
import { Handlers } from '../types';
import { OtpInputRef } from 'react-native-otp-entry';

const usePinKeyboard = () => {
    const otpInputRef = useRef<OtpInputRef>(null);
    const [pin, setPin] = useState<string>('');

    useEffect(() => {
        otpInputRef.current?.setValue(pin);
    }, [pin])
    
    const handleInsertPin = (value: string) => {
        setPin((prev) => prev + value);
    };

    const handleResetPin = () => {
        setPin('');
        otpInputRef.current?.setValue('');
    }

    const handleRemovePin = () => {
        setPin((prev) => prev.slice(0, -1) );
    };

    const handleBiometrics = () => console.log("NOT IMPLEMENTED YET");

    const handleKeyboardEvent = (event: Handlers, value: string | null) => {
        const map = {
            'insert': () => handleInsertPin(value ?? ''),
            'backspace': handleRemovePin,
            'biometrics': handleBiometrics
        }

        return map[event]();
    }

    return {
        resetPin: handleResetPin,
        runBiometrics: handleBiometrics,
        onKeyboardEvent: handleKeyboardEvent,
        otpInputRef,
    };
}

export { usePinKeyboard };