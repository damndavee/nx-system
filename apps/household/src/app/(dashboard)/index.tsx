import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { useSignOutMutation } from '../../stores/auth/auth.api';

const HomePage = () => {
    const [signOut] = useSignOutMutation();

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-2xl font-bold">Home Page</Text>
            <Text className="text-lg font-semibold">Welcome to the Household App!</Text>
            <Pressable
                onPress={() => signOut()}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    <Text>"Go to Dashboard"</Text>
            </Pressable>
        </View>
    );
};

export default HomePage;
