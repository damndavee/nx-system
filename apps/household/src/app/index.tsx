import { Text, Pressable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { createHouseholdWithSubcollections } from "../services/firebase";
import { WelcomeScreen } from "../features/welcome/screens";

export const InitialPage = () => {
  return (
    <WelcomeScreen />
  )
};

export default InitialPage;
