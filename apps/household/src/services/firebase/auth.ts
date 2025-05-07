import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { removePin } from '../../stores/auth/auth.service';
import { UserProfile } from './types';

export const authStateChangeListener = async (): Promise<{ user: FirebaseAuthTypes.User | null, userProfile: UserProfile | null }> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth().onAuthStateChanged(async (user) => {
            try {
                if (!user) {
                    removePin();
                    resolve({ user: null, userProfile: null });
                    return;
                }

                const userProfile = await getUserProfile(user.uid);
                resolve({ user, userProfile });
            } catch (error) {
                console.error("Error in authStateChangeListener:", error);
                reject(error);
            } finally {
                unsubscribe();
            }
        });
    });
};

export const getUserProfile = async (uid: string): Promise<UserProfile> => {
    const doc = await firestore().collection('users').doc(uid).get();
    
    const data = doc.data();
    if (!data) {
        throw new Error(`User profile not found for UID: ${uid}`);
    }
    return data as UserProfile;
}

// TODO: add update user profile function

export const signUpWithEmail = async (email: string, password: string) => (
    auth().createUserWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
        await firestore().collection('users').doc(user.uid).set({
            id: user.uid,
            name: 'New User',
            email: user.email || '',
            username: `user_${user.uid.substring(0, 5)}`,
            phoneNumber: '', 
            avatarUrl: '',
            termsAccepted: false,
            isNewUser: true,
            wasOnboardingShown: false,
            profileCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        return user
    })
    .catch(error => {
        console.error('Error during sign-up:', error);

        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        }
    })
);

export const signInWithEmail = async (email: string, password: string) => {
    try {
        await auth().signInWithEmailAndPassword(email, password)
        const idTokenResult = await auth().currentUser?.getIdTokenResult();
        const token = idTokenResult?.token;

        if(!token) return;

        console.log('TOKENOWSKI: ', token);
        
        // TODO: extract exp once biometrics?
        // const [headerEncoded, payloadEncoded] = token.split('.');

        // const decodedToken = JSON.parse(
        //     Buffer.from(payloadEncoded, "base64").toString("ascii"),
        // );

    } catch(error) {
        console.log('ERROR: ', error);
    }
}

export const signOut = async () => auth().signOut();