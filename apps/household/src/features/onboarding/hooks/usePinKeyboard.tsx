import { useState } from 'react'; 

const usePinKeyboard = () => {
    const [isPinVisible, setPinVisible] = useState<boolean>(false);
    const [pin, setPin] = useState<string>('');
    
    const handleInsertPin = (value: string) => setPin(prevState => prevState + value);

    const handleRemovePin = () => setPin(prevState => prevState.slice(0, -1));
    
    const handleBiometrics = () => console.log("NOT IMPLEMENTED YET");

    const handlePinVisibility = () => setPinVisible(!isPinVisible);

    return {
        insertPin: handleInsertPin,
        removePin: handleRemovePin,
        runBiometrics: handleBiometrics,
        togglePinVisibility: handlePinVisibility,
        pin,
        isPinVisible
    };
}

export { usePinKeyboard };