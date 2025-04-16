import { useState } from 'react'; 
import { Handlers } from '../types';
import { setPin, setPinEnabledBy } from '../../../stores/auth/auth.service';

const usePinKeyboard = () => {
    const [isPinVisible, setPinVisible] = useState<boolean>(false);
    const [pinValue, setPinValue] = useState<string>('');
    const [isDisabled, setDisabled] = useState<boolean>(false);
    
    const handleInsertPin = (value: string) => {
        if(!isDisabled) {
            setPinValue(prevState => prevState + value)
        }
    };

    const handleRemovePin = () => {
        setDisabled(false);
        setPinValue(prevState => prevState.slice(0, -1));
    };
    
    const handleBiometrics = () => console.log("NOT IMPLEMENTED YET");

    const handlePinVisibility = () => setPinVisible(!isPinVisible);

    const handleSubmitPin = (id: string) => {
        setDisabled(true);
        setPinEnabledBy(id);
        setPin(pinValue);
    }

    const keyboardEvent = (event: Handlers, value: string | null) => {
        const map = {
            'insert': () => handleInsertPin(value ?? ''),
            'backspace': handleRemovePin,
            'biometrics': handleBiometrics
        }

        return map[event]();
    }

    return {
        insertPin: handleInsertPin,
        removePin: handleRemovePin,
        runBiometrics: handleBiometrics,
        togglePinVisibility: handlePinVisibility,
        submitPin: handleSubmitPin,
        disabled: isDisabled,
        pin: pinValue,
        keyboardEvent,
        isPinVisible
    };
}

export { usePinKeyboard };