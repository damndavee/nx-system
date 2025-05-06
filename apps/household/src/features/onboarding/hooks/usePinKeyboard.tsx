import { useReducer, useRef } from 'react'; 
import { Handlers } from '../types';
import { OtpInputRef } from 'react-native-otp-entry';

interface PinState {
    pin: string;
    initialPin: string | null;
    error: string | null;
    isPinConfirmed: boolean;
}

type PinAction =
    | { type: 'INSERT_PIN'; payload: string }
    | { type: 'REMOVE_PIN' }
    | { type: 'SUBMIT_PIN' }
    | { type: 'RESET_PIN' }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'CLEAR_ERROR' };

    const pinReducer = (state: PinState, action: PinAction): PinState => {
        switch (action.type) {
            case 'INSERT_PIN': {
                if (state.pin.length >= 4) return { ...state };
                return { ...state, pin: state.pin + action.payload };
            }
    
            case 'REMOVE_PIN':
                return { ...state, pin: state.pin.slice(0, -1) };

    
            case 'SUBMIT_PIN': {
                if (!state.initialPin) {
                    return { ...state, initialPin: state.pin, pin: '', error: null };
                }
    
                return state.initialPin === state.pin
                    ? { ...state, isPinConfirmed: true, error: null }
                    : { ...state, pin: '', error: 'PINs do not match. Please try again.' };
                }
    
            case 'RESET_PIN':
                return { pin: '', initialPin: null, error: null, isPinConfirmed: false };
    
            case 'SET_ERROR':
                return { ...state, error: action.payload };
    
            case 'CLEAR_ERROR':
                return { ...state, error: null };
    
            default:
                return state;
        }
    };

const usePinKeyboard = () => {
    const otpInputRef = useRef<OtpInputRef>(null);
    const [state, dispatch] = useReducer(pinReducer, {
        pin: '',
        initialPin: null,
        error: null,
        isPinConfirmed: false
    })
    
    const handleInsertPin = (value: string) => {
        dispatch({ type: 'INSERT_PIN', payload: value });
        otpInputRef.current?.setValue(state.pin + value);
    };

    const handleRemovePin = () => {
        dispatch({ type: 'REMOVE_PIN' });
        otpInputRef.current?.setValue(state.pin.slice(0, -1));
    };
    
    const handleBiometrics = () => console.log("NOT IMPLEMENTED YET");

    const handleSubmitPin = () => {
        dispatch({ type: 'SUBMIT_PIN' });
        otpInputRef.current?.setValue('');
    };

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
        submitPin: handleSubmitPin,
        initalPin: state.initialPin,
        error: state.error,
        isPinConfirmed: state.isPinConfirmed,
        otpInputRef,
        keyboardEvent,
    };
}

export { usePinKeyboard };