import { FormControlProps } from "../components/FormControl";
import { SigninFormSchema, SignupFormSchema } from "../validation/auth.schema";

const INPUT_MAP: Pick<FormControlProps<SigninFormSchema | SignupFormSchema>, 'id' | 'placeholder' | 'label' | 'helperText' | 'icon' | 'type'>[]  = [
    {
        id: 'email',
        placeholder: 'Enter Your email',
        label: 'Email',
        helperText: '',
        icon: 'at-outline',
        type: 'text'
    },
    {
        id: 'password',
        placeholder: 'Enter Your password',
        label: 'Password',
        helperText: '',
        icon: 'lock-open-outline',
        type: 'password'
    },
    {
        id: 'confirmPassword',
        placeholder: 'Confirm Your password',
        label: 'Confirm password',
        helperText: '',
        icon: 'lock-open-outline',
        type: 'password'
    }
]

export { INPUT_MAP };