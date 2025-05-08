import { Text, View } from 'react-native';
import React from 'react';

const HomePage = () => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-2xl font-bold">Home Page</Text>
            <Text className="text-lg font-semibold">Welcome to the Household App!</Text>
        </View>
    );
};

export default HomePage;
