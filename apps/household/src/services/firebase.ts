import firestore from '@react-native-firebase/firestore';

export const createHouseholdWithSubcollections = async () => {
    try {
        const householdRef = await firestore().collection('household').add({
            name: 'test household',
            admin: 'user001',
            members: ['user001', 'user002', 'user003']
        });

        console.log("Household and subcollections created:", householdRef.id);
    } catch (error) {
        console.error("Error creating household:", error);
    }
};