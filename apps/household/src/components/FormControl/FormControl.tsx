import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { cssInterop } from 'nativewind';
import { Ionicons } from "@expo/vector-icons";
import { FormControlProps, formControlVariants } from './defs';

const FormControl= <T, >({ size, variant, icon, label, placeholder, helperText, error, onChange, onBlur }: FormControlProps<T>) => {
  // TODO: enable this once moved to components library
  // const { error, input, label, icon: iconStyle } = formControlVariants({ size, variant });

  cssInterop(Ionicons, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: 'color',
        fontSize: 'size'
      }
    }
  })

  return (
      <View className='w-full gap-1'>
          <Text className="text-gray-800 text-base">{label}</Text>
          <View className='flex-row justify-center items-center border rounded-md'>
            <Ionicons name={icon} className='text-gray-800 text-2xl px-2 py-2 border-r' />
            <TextInput onChangeText={onChange} onBlur={onBlur} className='flex-1 px-4 py-2' placeholder={placeholder} placeholderTextColor='#9ca3af' />
          </View>
          {helperText && <Text className='text-gray-600 text-sm'>Helper text</Text>}
          {error && <Text className='text-red-400' >{error}</Text>}
      </View>
  )
}

export { FormControl, FormControlProps };