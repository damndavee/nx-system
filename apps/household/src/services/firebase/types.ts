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