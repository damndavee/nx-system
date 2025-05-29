import { Redirect } from "expo-router";
import { useAppSelector } from "../stores";
import { selectScreen } from "../stores/auth/auth.reducer";
import { WelcomeScreen } from "../features/welcome/screens";

export const InitialPage = () => {
  const appScreen = useAppSelector(selectScreen);
  
  if(appScreen !== '/') {
    return <Redirect href={appScreen} />
  }
  
  return (
    <WelcomeScreen />
  )
};

export default InitialPage;
