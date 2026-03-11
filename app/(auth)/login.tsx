import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Login() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Screen</Text>
      <Link href="/(tabs)/home" asChild>
        <Button title="Login" onPress={() => {}} />
      </Link>
      <Link href="/register" style={{ marginTop: 20, color: "blue" }}>
        Go to Register
      </Link>
    </View>
  );
}
