import React from 'react';
import { PinPasswordScreen } from '../../features/onboarding/screens'
import { useAppSelector, useAppDispatch } from '../../stores';
import { selectInitialPin, selectUserProfile } from '../../stores/auth/auth.reducer';
import { setupPinThunk } from '../../stores/auth/auth.thunk';

const SetupPinPage = () => {
    const dispatch = useAppDispatch();
    const initialPin = useAppSelector(selectInitialPin);
    const userProfile = useAppSelector(selectUserProfile)
    
    const handlePinAuthentication = async (pin: string) => {
        const result = await dispatch(setupPinThunk({ pin, userId: userProfile?.id ?? '' })); // Assuming userId is not needed here, or you can pass the actual userId if available.
    }
    
    return (
        <PinPasswordScreen 
            onSubmit={handlePinAuthentication} 
            title={initialPin ? 'Potwierdź swój PIN.' : 'Ustaw 4-cyfrowy PIN.'}
            subtitle='Dzięki temu będziesz w stanie szybciej logować się do aplikacji.'
        />
    )
}

export default SetupPinPage;