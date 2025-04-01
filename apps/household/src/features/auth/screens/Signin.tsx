import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from "react-hook-form";
import { SvgXml } from 'react-native-svg';
import { router, Stack } from 'expo-router';
import { cssInterop } from 'nativewind';
import { FormControl, FormControlProps } from '../../../components/FormControl';
import { SigninFormSchema, validationSigninSchema } from "../../../validation/auth.schema";
import { Divider } from '../../../components/Divider';
import { appleMarkup, facebookMarkup, googleMarkup, signinSvgMarkup } from '../../../components/markups';
import { INPUT_MAP } from "../../../data/auth.data";
import { signInWithEmail } from 'apps/household/src/services/firebase/auth';

const SigninScreen = () => {
  cssInterop(ScrollView, {
      className: "style",
      contentContainerClassName: "contentContainerStyle",
  });

  const { control, handleSubmit } = useForm<SigninFormSchema>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(validationSigninSchema)
  });

  const SIGNIN_INPUT_DATA = INPUT_MAP.filter(input => input.id !== 'confirmPassword') as Pick<FormControlProps<SigninFormSchema>, 'id' | 'placeholder' | 'label' | 'helperText' | 'icon' | 'type'>[];

  const onSubmit = handleSubmit(
    (data) => {
      signInWithEmail(data.email, data.password);
    }, 
    (errors) => console.log("ERRORS: ", errors));

  return (
    <>
      <Stack.Screen options={{ 
        title: 'Zaloguj się', 
        headerShadowVisible: false 
      }} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex-1 bg-white'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="flex-1 bg-white px-8" contentContainerClassName='items-center'>
            <SvgXml xml={signinSvgMarkup} width="200" height="200" />
            <View className='w-full gap-5'>
              <View className='gap-6'>
                <View className='gap-3'>
                  {SIGNIN_INPUT_DATA.map(({ id, ...input }) => {
                    return (
                      <View key={id}>
                        <Controller
                          key={id}
                          control={control}
                          rules={{
                            required: true
                          }}
                          name={id}
                          render={({ field: { onChange, onBlur, value, name }, formState: { errors }}) => (
                            <FormControl
                              {...input}
                              key={name}
                              id={name}
                              value={value}
                              onChange={(e) => onChange(e)}
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
                <Pressable className='self-end'><Text className="text-[#6c63ff] text-center underline">Przypomnij hasło.</Text></Pressable>
                <Pressable onPress={onSubmit} className="bg-[#6c63ff] active:bg-[#5b52ee] px-12 py-4 rounded-lg w-full">
                  <Text className="text-white font-semibold text-center">Zaloguj</Text>
                </Pressable>
              </View>
              <Divider />
              <View className='gap-5 flex-row items-center justify-center'>
                <Pressable className='p-3'>
                  <SvgXml xml={googleMarkup} width="40" height="40" />
                </Pressable>
                <Pressable className='p-3'>
                  <SvgXml xml={facebookMarkup} width="40" height="40" />
                </Pressable>
                <Pressable className='p-3'>
                  <SvgXml xml={appleMarkup} width="40" height="40" />
                </Pressable>
              </View>
              <View className='flex-row justify-center gap-1'>
                  <Text className="text-gray-800 text-center">Nie posiadasz konta?</Text>
                  <Pressable onPress={() => router.replace('/(auth)/signup')}>
                    <Text className="text-[#6c63ff] text-center underline">Zarejestruj się.</Text>
                  </Pressable>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  )
}

export { SigninScreen };