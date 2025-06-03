import { useState } from 'react';
import { PinPasswordScreen } from '../../features/onboarding/screens'
import { useAppSelector, useAppDispatch } from '../../stores';
import { selectInitialPin, selectUserProfile } from '../../stores/auth/auth.reducer';
import { setupPinThunk } from '../../stores/auth/auth.thunk';
import { router } from 'expo-router';

const SetupPinPage = () => {
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const initialPin = useAppSelector(selectInitialPin);
    const userProfile = useAppSelector(selectUserProfile)
    
    const handlePinAuthentication = async (pin: string) => {
        const result = await dispatch(setupPinThunk({ pin, userId: userProfile?.id ?? '' }));
        const payload = result.payload as { message?: string };

        // TODO: refactor this to use a more generic error handling
        if (setupPinThunk.rejected.match(result) && payload.message) {
            setError(payload.message)
        } else {
            setError(null);
            router.replace('/(dashboard)')
        }
    }
    
    return (
        <PinPasswordScreen 
            onSubmit={handlePinAuthentication} 
            title={initialPin ? 'Potwierdź swój PIN.' : 'Ustaw 4-cyfrowy PIN.'}
            subtitle='Dzięki temu będziesz w stanie szybciej logować się do aplikacji.'
            error={error}
        />
    )
}

export default SetupPinPage;