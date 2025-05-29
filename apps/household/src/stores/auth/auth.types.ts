import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type UserProfile = {
    id: string;
    name: string;
    email: string;
    username: string;
    avatarUrl?: string;
    phoneNumber?: string;
    profileCompleted: boolean;
    termsAccepted: boolean;
    isNewUser: boolean;
    wasOnboardingShown: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type PinDataPayload = {
    pin: string;
    userId: string;
}

export type ResolveRedirectPayload = {
    user?: FirebaseAuthTypes.User;
    userProfile?: UserProfile;
}

export type SubmitPinResult = {
    message: string;
    isNewPin: boolean;
}

export type UserProfileQuery = UserProfile | null | undefined;
export type AuthQuery = FirebaseAuthTypes.User | null | undefined;
export type AuthQueryParams = {
    email: string;
    password: string;
}