// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Edit app/index.tsx to edit this screen.</Text>
//     </View>
//   );
// }
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is the starting Index screen.</Text>
      
      {/* This link works exactly like an <a> tag on the web! */}
      <Link href="/home" style={{ marginTop: 20, color: 'blue', fontSize: 18 }}>
        Go to Home Screen
      </Link>
    </View>
  );
}