import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from "react-hook-form";
import { Text, View, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { SignupFormSchema, validationSignupSchema } from "../../../validation/auth.schema";
import { FormControl } from '../../../components/FormControl';
import { cssInterop } from 'nativewind';
import { router, Stack } from 'expo-router';
import { signupSvgMarkup } from '../../../components/markups';
import { INPUT_MAP } from "../../../data/auth.data";
import { signUpWithEmail } from '../../../services/firebase/auth';

const SignupScreen = () => {
  const { control, handleSubmit } = useForm<SignupFormSchema>({
      defaultValues: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      resolver: zodResolver(validationSignupSchema)
  });

  cssInterop(ScrollView, {
    className: "style",
    contentContainerClassName: "contentContainerStyle",
  });

  const onSubmit = handleSubmit(
    (data) => {
      signUpWithEmail(data.email, data.password);
    }, 
    (errors) => console.log("ERRORS: ", errors));

  return (
    <>
      <Stack.Screen options={{ 
        title: 'Dołącz do społeczności', 
        headerShadowVisible: false 
      }} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex-1 bg-white'>
        <ScrollView className="flex-1 bg-white px-8" contentContainerClassName='items-center'>
          <SvgXml xml={signupSvgMarkup} width="150" height="150" />
          <View className='w-full'>
            <View className='gap-6'>
              <View className='gap-3'>
                {INPUT_MAP.map(({ id, ...input }) => {
                  return (
                    <View key={id}>
                      <Controller
                        control={control}
                        name={id}
                        render={({ field: { onChange, onBlur, value, name }, formState: { errors }}) => (
                          <FormControl
                            {...input}
                            key={name}
                            id={name}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            error={errors[name]?.message}
                            variant='filled'
                            size='lg'
                          />
                        )}  
                      />
                    </View>
                  )
                })}
              </View>
              <Text className='text-gray-400 text-sm'>Rejestrując się akceptujesz politykę prywatności firmy i regulamin korzystania z aplikacji.</Text>
              <Pressable onPress={onSubmit} className="bg-[#6c63ff] active:bg-[#5b52ee] px-12 py-4 rounded-lg w-full">
                <Text className="text-white font-semibold text-center">Dołącz</Text>
              </Pressable>
            </View>
            <View className='flex-row justify-center gap-1 mt-10'>
                <Text className="text-gray-800 text-center">Posiadasz konto?</Text>
                <Pressable onPress={() => router.replace('/(auth)/signin')}>
                  <Text className="text-[#6c63ff] text-center underline">Zaloguj się.</Text>
                </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export { SignupScreen };