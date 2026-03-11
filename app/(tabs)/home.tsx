import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "../../src/components/Navbar";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={['top']}>
      <Navbar />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Home Screen Content</Text>
      </View>
    </SafeAreaView>
  );
}
