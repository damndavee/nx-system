import { Text, View } from 'react-native'
import React from 'react'

const Divider = () => {
    return (
        <View className="w-full gap-2 flex-row items-center">
            <View className='h-0.5 bg-gray-400 flex-1 rounded-md'></View>
            <Text>Zaloguj się za pomocą</Text>
            <View className='h-0.5 bg-gray-400 flex-1 rounded-md'></View>
        </View>
    )
}

export { Divider }
