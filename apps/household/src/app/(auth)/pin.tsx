import { router } from 'expo-router';
import { PinPasswordScreen } from '../../features/onboarding/screens';
import { useAppSelector, useAppDispatch } from '../../stores';
import { selectUserProfile } from '../../stores/auth/auth.reducer';
import { loginByPinThunk } from '../../stores/auth/auth.thunk';
import { useState } from 'react';

const PinPage = () => {
    const [error, setError] = useState<string | null>(null);
    const userProfile = useAppSelector(selectUserProfile)
    const dispatch = useAppDispatch();

    const handlePinAuthentication = async (pin: string) => {
        const result = await dispatch(loginByPinThunk({ pin, userId: userProfile?.id || '' }));
        const payload = result.payload as { message?: string };

        // TODO: refactor this to use a more generic error handling
        if (loginByPinThunk.rejected.match(result) && payload.message) {
            setError(payload.message)
        } else {
            setError(null);
            router.replace('/(dashboard)')
        }
    }

    return (
        <PinPasswordScreen 
            onSubmit={handlePinAuthentication} 
            title={`Witaj, ${userProfile?.name}`}
            subtitle='Jak się masz? 😊'
            error={error}  
        />
    )
}

export default PinPage;