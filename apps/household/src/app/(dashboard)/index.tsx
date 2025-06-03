import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { useAppDispatch } from '../../stores';
import { signOutThunk } from '../../stores/auth/auth.thunk';

const HomePage = () => {
    const dispatch = useAppDispatch();

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-2xl font-bold">Home Page</Text>
            <Text className="text-lg font-semibold">Welcome to the Household App!</Text>
            <Pressable
                onPress={() => dispatch(signOutThunk())}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    <Text>"Go to Dashboard"</Text>
            </Pressable>
        </View>
    );
};

export default HomePage;
