import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles/navbarStyles/AddAddress.styles";
import { useThemeColors } from "../../hooks/useThemeColors";

export const AddAddress = () => {
  const colors = useThemeColors();
  
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.7 : 1 }
      ]}
      onPress={() => console.log("Add address clicked")}
    >
      <View style={[styles.iconWrapper, { backgroundColor: colors.primaryLight }]}>
        <Ionicons name="add" size={18} color={colors.primary} />
      </View>
      <Text style={[styles.text, { color: colors.primary }]}>Add New Address</Text>
    </Pressable>
  );
};
