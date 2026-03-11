import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Register() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Register Screen</Text>
      <Link href="/login" style={{ marginTop: 20, color: "blue" }}>
        Back to Login
      </Link>
    </View>
  );
}
