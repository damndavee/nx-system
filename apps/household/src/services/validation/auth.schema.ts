import * as Yup from 'yup';

type Fields = 'email' | 'password' | 'confirmPassword';

type SignUpForm = Record<Fields, string>;
type SignInForm = Record<Exclude<Fields, 'confirmPassword'>, string>;

type ValidationSchema = Yup.ObjectSchema<SignUpForm | SignInForm>;

const validationSignupSchema = Yup.object<SignUpForm>().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must Contain: One uppercase, One lowercase, One number and One special case character"
    ),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Confirm password is required')
});

const validationSigninSchema = Yup.object<SignInForm>().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export { SignInForm, SignUpForm, ValidationSchema, validationSigninSchema, validationSignupSchema }