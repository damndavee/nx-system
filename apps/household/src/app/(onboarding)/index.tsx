import { Pressable, Text, View } from 'react-native';
import { useSignOutMutation } from '../../stores/auth/auth.api';

const InitialPage = () => {

  const [signOut] = useSignOutMutation();

  return (
    <View className='flex-1 bg-green-200 items-center justify-center'>
      <Text>Siemano witam zalogowanego koelgę!</Text>
      <Pressable className='p-5 bg-red-100 rounded-lg' onPress={() => {
        signOut()
      }}><Text>Signout!</Text></Pressable>
    </View>
  )
}

export default InitialPage;