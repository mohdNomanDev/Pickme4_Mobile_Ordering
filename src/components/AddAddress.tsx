import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/theme";
import { styles } from "../styles/navbarStyles/AddAddress.styles";

export const AddAddress = () => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.7 : 1 }
      ]}
      onPress={() => console.log("Add address clicked")}
    >
      <View style={styles.iconWrapper}>
        <Ionicons name="add" size={18} color={Colors.primary} />
      </View>
      <Text style={styles.text}>Add New Address</Text>
    </Pressable>
  );
};
