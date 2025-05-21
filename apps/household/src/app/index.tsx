import { Redirect } from "expo-router";
import { useAppSelector } from "../stores";
import { selectScreen } from "../stores/auth/auth.reducer";

export const InitialPage = () => {
  const appScreen = useAppSelector(selectScreen);
  
  return (
    <Redirect href={appScreen} />
  )
};

export default InitialPage;
