import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInRight, FadeInDown, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Spacing } from '../../src/theme/theme';
import { useThemeColors } from '../../src/hooks/useThemeColors';

const RECENT_SEARCHES = ['Pizza', 'Burger', 'Sushi', 'Pasta'];
const FOOD_RECOMMENDATIONS = ['Biryani', 'Chicken Tikka', 'Paneer Butter Masala', 'Dosa', 'Chole Bhature', 'Momos'];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SearchModal() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const colors = useThemeColors();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View 
        entering={FadeInDown.duration(400)}
        style={[styles.header, { borderBottomColor: colors.border }]}
      >
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
        <View style={[styles.searchBox, { backgroundColor: colors.surface }]}>
          <Ionicons name="search" size={22} color={colors.primary} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Search for restaurants or dishes..."
            placeholderTextColor={colors.textLight}
            autoFocus
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      <View style={styles.content}>
        {/* Recent Searches */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent searches</Text>
          <View style={styles.listContainer}>
            {RECENT_SEARCHES.map((item, index) => (
              <Animated.View key={index} entering={FadeInRight.delay(index * 100)}>
                <TouchableOpacity style={styles.recentItem}>
                  <View style={[styles.recentIcon, { backgroundColor: colors.surface }]}>
                    <Ionicons name="time-outline" size={18} color={colors.textLight} />
                  </View>
                  <Text style={[styles.recentText, { color: colors.text }]}>{item}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* What's on your mind? */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>What's on your Mind?</Text>
          <FlatList
            data={FOOD_RECOMMENDATIONS}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Animated.View entering={FadeInRight.delay(400 + index * 100)}>
                <AnimatedPressable 
                  style={({ pressed }) => [
                    styles.foodItem,
                    { transform: [{ scale: pressed ? 0.95 : 1 }] }
                  ]}
                >
                  <View style={[styles.foodIconPlaceholder, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                     <Ionicons name="restaurant" size={28} color={colors.primary} />
                  </View>
                  <Text style={[styles.foodText, { color: colors.text }]}>{item}</Text>
                </AnimatedPressable>
              </Animated.View>
            )}
            contentContainerStyle={styles.foodList}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: Spacing.lg,
    height: 50,
    boxShadow: "0 4 10 rgba(0, 0, 0, 0.05)",
    elevation: 3,
  },
  input: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingTop: Spacing.xl,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    letterSpacing: -0.5,
  },
  listContainer: {
    paddingHorizontal: Spacing.lg,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  recentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  recentText: {
    fontSize: 16,
    fontWeight: '600',
  },
  foodList: {
    paddingHorizontal: Spacing.lg,
  },
  foodItem: {
    alignItems: 'center',
    marginRight: 24,
    width: 90,
  },
  foodIconPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    boxShadow: "0 4 15 rgba(0, 0, 0, 0.05)",
    elevation: 4,
  },
  foodText: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});
