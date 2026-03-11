import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function RestaurantDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Restaurant Detail Screen for ID: {id}</Text>
    </View>
  );
}
