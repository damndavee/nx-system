import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { twMerge } from 'tailwind-merge';
import { Icon, PinButtonProps } from '../types';

const PinButton = (props: PinButtonProps) => {
  const generateButton = (input: string) => {
    if(isNaN(+input)) {
      return <Ionicons name={input as Icon} size={32} color='black' />
    }

    return <Text className='text-2xl font-medium text-black'>{input}</Text>
  }

  return (
    <Pressable
        className={twMerge(`bg-white m-2 rounded-lg shadow-slate-500 shadow-lg items-center active:bg-gray-50 justify-center flex-1`, props.className)}
        onPress={props.onPress}
    >
      {generateButton(props.label)}
    </Pressable>
  )
}

export { PinButton, PinButtonProps };