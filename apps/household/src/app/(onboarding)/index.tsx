import { Pressable, Text, View } from 'react-native';
import { signOut } from "../../services/firebase/auth";
import { router } from 'expo-router';

const InitialPage = () => {

  return (
    <View className='flex-1 bg-green-200 items-center justify-center'>
      <Text>Siemano witam zalogowanego koelgę!</Text>
      <Pressable className='p-5 bg-red-100 rounded-lg' onPress={() => {
        // signOut();
        signOut().then(() => router.replace('/welcome'))
        
      }}><Text>Signout!</Text></Pressable>
    </View>
  )
}

export default InitialPage;