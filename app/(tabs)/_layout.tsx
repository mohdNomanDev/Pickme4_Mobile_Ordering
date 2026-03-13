import { api } from "@/api/apiClient";
import { setProfile } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect } from "react";

export default function TabLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await api.get("/user/profile");
        console.log("User profile data fetched:", data);
        if (data) {
          dispatch(setProfile(data));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "green", headerShown: false }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="receipt" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
