import { Text, View } from "react-native";
import { Navbar } from "../src/components/Navbar";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Navbar />
      <Text>Home Screen</Text>
    </View>
  );
}
