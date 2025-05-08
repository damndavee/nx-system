import { useEffect, useReducer, useRef } from 'react'; 
import { Handlers } from '../types';
import { OtpInputRef } from 'react-native-otp-entry';
import { getPin, setPin } from '../../../stores/auth/auth.service';
import { router, usePathname } from 'expo-router';

interface PinState {
    pin: string;
    initialPin: string | null;
    error: string | null;
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
            const newPin = state.pin + action.payload;

            if (newPin.length > 4) return { ...state };

            return { ...state, pin: newPin };
        }

        case 'REMOVE_PIN':
            return { ...state, pin: state.pin.slice(0, -1) };


        case 'SUBMIT_PIN': {
            if (!state.initialPin) {
                return { ...state, initialPin: state.pin, pin: '', error: null };
            }

            return state.initialPin === state.pin
                ? { ...state, pin: '', initialPin: '', error: null }
                : { ...state, pin: '', error: 'PINs do not match. Please try again.' };
            }

        case 'RESET_PIN':
            return { pin: '', initialPin: null, error: null};

        case 'SET_ERROR':
            return { ...state, pin: '', error: action.payload };

        case 'CLEAR_ERROR':
            return { ...state, error: null };

        default:
            return state;
    }
};

const pinActions = {
    setup: async (state: PinState, dispatch: React.Dispatch<PinAction>, otpInputRef: React.RefObject<OtpInputRef>) => {
        dispatch({ type: 'SUBMIT_PIN' });

        if (state.initialPin && state.initialPin === state.pin) {
            console.log('PIN confirmed. Saving PIN:', state.pin);
            await setPin(state.pin);
            otpInputRef.current?.setValue('');
            router.replace('/home');
        }
    },
    login: async (state: PinState, dispatch: React.Dispatch<PinAction>, otpInputRef: React.RefObject<OtpInputRef>) => {
        const storedPin = await getPin();
        if (storedPin === state.pin) {
            console.log('PIN correct. Logging in...');
            router.replace('/(dashboard)');
        } else {
            dispatch({ type: 'SET_ERROR', payload: 'Incorrect PIN. Please try again.' });
            otpInputRef.current?.setValue('');
        }
    },
};

const usePinKeyboard = () => {
    const otpInputRef = useRef<OtpInputRef>(null);
    const pathname = usePathname();

    const [state, dispatch] = useReducer(pinReducer, {
        pin: '',
        initialPin: null,
        error: null,
    })

    useEffect(() => {
        otpInputRef.current?.setValue(state.pin);
    }, [state.pin])
    
    const handleInsertPin = (value: string) => {
        dispatch({ type: 'INSERT_PIN', payload: value });
    };

    const handleRemovePin = () => {
        dispatch({ type: 'REMOVE_PIN' });
    };
    
    const handleBiometrics = () => console.log("NOT IMPLEMENTED YET");

    const handleSubmitPin = async () => {
        const mode = pathname.includes('setup') ? 'setup' : 'login';
        await pinActions[mode]?.(state, dispatch, otpInputRef);
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
        otpInputRef,
        keyboardEvent,
    };
}

export { usePinKeyboard };