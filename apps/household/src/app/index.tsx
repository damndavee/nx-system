import { Redirect } from "expo-router";

export const InitialPage = () => {
  return (
    <Redirect href="/welcome" />
  )
};

export default InitialPage;
