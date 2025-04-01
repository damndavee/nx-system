import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { twMerge } from 'tailwind-merge';
import { Icon, PinButtonProps } from '../types';

const PinButton = (props: PinButtonProps) => {
  const generateButton = (input: string) => {
    if(isNaN(+input)) {
      return <Ionicons name={input as Icon} size={24} color='black' />
    }

    return <Text className='text-xl text-black'>{input}</Text>
  }

  return (
    <Pressable
        className={twMerge(`items-center active:bg-gray-200 justify-center flex-1`, props.className)}
        onPress={props.onPress}
    >
      {generateButton(props.label)}
    </Pressable>
  )
}

export { PinButton, PinButtonProps };