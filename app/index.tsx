import { Redirect } from "expo-router";

export default function Index() {
  // You can add logic here to check if the user is authenticated
  // For now, let's redirect to the home tab
  return <Redirect href="/(tabs)/home" />;
}
