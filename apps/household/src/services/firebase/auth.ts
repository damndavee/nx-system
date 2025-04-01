import auth from '@react-native-firebase/auth';

export const authStateChangeListener = () => {
    return new Promise((resolve, reject) => {
        return auth().onAuthStateChanged(user => {
            if(user) resolve(user);
        });
    })
};

export const signUpWithEmail = async (email: string, password: string) => (
    auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        console.log('User account created & signed in!');
    })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        }

        console.error(error);
    })
);

export const signInWithEmail = async (email: string, password: string) => {
    try {
        await auth().signInWithEmailAndPassword(email, password)
        const idTokenResult = await auth().currentUser?.getIdTokenResult();
        const token = idTokenResult?.token;

        if(!token) return;
        
        // TODO: extract exp once biometrics?
        const [headerEncoded, payloadEncoded] = token.split('.');

        const decodedToken = JSON.parse(
            Buffer.from(payloadEncoded, "base64").toString("ascii"),
        );

    } catch(error) {
        console.log('ERROR: ', error.code);
    }
}

export const signOut = async () => auth().signOut();