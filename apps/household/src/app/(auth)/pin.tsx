import { PinPasswordScreen } from '../../features/onboarding/screens';
import { useAppSelector, useAppDispatch } from '../../stores';
import { selectUserProfile } from '../../stores/auth/auth.reducer';
import { loginByPinThunk } from '../../stores/auth/auth.thunk';

const PinPage = () => {
    const userProfile = useAppSelector(selectUserProfile)
    const dispatch = useAppDispatch();

    const handlePinAuthentication = async (pin: string) => {
        const result = await dispatch(loginByPinThunk({ pin, userId: userProfile?.id || '' }))
    }

    return (
        <PinPasswordScreen 
            onSubmit={handlePinAuthentication} 
            title={`Witaj, ${userProfile?.name}`}
            subtitle='Jak się masz? 😊'    
        />
    )
}

export default PinPage;