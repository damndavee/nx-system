import { Text, Pressable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { createHouseholdWithSubcollections } from "../services/firebase";

export const InitialPage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'red', padding: 20 }}>
        <Text>Hi!!!</Text>
        <Pressable onPress={createHouseholdWithSubcollections}><Text>Testing Purposes</Text></Pressable>
    </SafeAreaView>
  )
};

export default InitialPage;
