import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Spacing } from '../../src/theme/theme';
import { useThemeColors } from '../../src/hooks/useThemeColors';

const RECENT_SEARCHES = ['Pizza', 'Burger', 'Sushi', 'Pasta'];
const FOOD_RECOMMENDATIONS = ['Biryani', 'Chicken Tikka', 'Paneer Butter Masala', 'Dosa', 'Chole Bhature', 'Momos'];

export default function SearchModal() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const colors = useThemeColors();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={[styles.searchBox, { backgroundColor: colors.surface }]}>
          <Ionicons name="search" size={20} color={colors.textLight} />
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
      </View>

      <View style={styles.content}>
        {/* Recent Searches */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent searches</Text>
          <View style={styles.listContainer}>
            {RECENT_SEARCHES.map((item, index) => (
              <TouchableOpacity key={index} style={styles.recentItem}>
                <Ionicons name="time-outline" size={18} color={colors.textLight} />
                <Text style={[styles.recentText, { color: colors.textLight }]}>{item}</Text>
              </TouchableOpacity>
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
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.foodItem}>
                <View style={[styles.foodIconPlaceholder, { backgroundColor: colors.primaryLight }]}>
                   <Ionicons name="restaurant-outline" size={24} color={colors.primary} />
                </View>
                <Text style={[styles.foodText, { color: colors.text }]}>{item}</Text>
              </TouchableOpacity>
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
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Spacing.sm,
    paddingHorizontal: Spacing.md,
    height: 44,
  },
  input: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingTop: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  listContainer: {
    paddingHorizontal: Spacing.lg,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  recentText: {
    marginLeft: Spacing.sm,
    fontSize: 16,
  },
  foodList: {
    paddingHorizontal: Spacing.lg,
  },
  foodItem: {
    alignItems: 'center',
    marginRight: Spacing.lg,
    width: 80,
  },
  foodIconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  foodText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
