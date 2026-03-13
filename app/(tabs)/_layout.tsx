import { api } from "@/api/apiClient";
import { setProfile } from "@/store/slices/userSlice";
import { setAddresses } from "@/store/slices/addressesSlice";
import { useAppDispatch } from "@/store/store";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";

export default function TabLayout() {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await api.get("/user/profile");
        if (data) {
          console.log(data);
          dispatch(setProfile(data));
          if (data.addresses) {
            dispatch(setAddresses(data.addresses));
          }
        }
      } catch (error) {
        console.warn("API Request Failed, using fallback mock data:", error);
        
        // Mock profile for testing
        const mockUser = {
          id: "123",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1234567890",
          address: "123 Main St, City, Country",
          profileImage: "https://via.placeholder.com/150",
        };
        dispatch(setProfile(mockUser));
      } finally {
        setIsReady(true);
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  // Avoid rendering layout before initial state is handled to prevent Web hydration errors
  if (!isReady && typeof window !== 'undefined') {
    return null;
  }

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
