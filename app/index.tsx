import { Redirect } from "expo-router";

export default function Index() {
  // You can add logic here to check if the user is authenticated
  // For now, let's redirect to the home tab
  return <Redirect href="/(tabs)/home" />;
}

// import { View, Text } from "react-native";

// export default function Home() {
//   return (
//     <View className="flex-1 items-center justify-center bg-blue-500">
//       <Text className="text-white text-xl font-bold">
//         NativeWind Working 🚀
//       </Text>
//     </View>
//   );
// }
