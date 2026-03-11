import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing } from '../../src/theme/theme';

const RECENT_SEARCHES = ['Pizza', 'Burger', 'Sushi', 'Pasta'];
const FOOD_RECOMMENDATIONS = ['Biryani', 'Chicken Tikka', 'Paneer Butter Masala', 'Dosa', 'Chole Bhature', 'Momos'];

export default function SearchModal() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={Colors.textLight} />
          <TextInput
            style={styles.input}
            placeholder="Search for restaurants or dishes..."
            autoFocus
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color={Colors.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.content}>
        {/* Recent Searches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent searches</Text>
          <View style={styles.listContainer}>
            {RECENT_SEARCHES.map((item, index) => (
              <TouchableOpacity key={index} style={styles.recentItem}>
                <Ionicons name="time-outline" size={18} color={Colors.textLight} />
                <Text style={styles.recentText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* What's on your mind? */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's on your Mind?</Text>
          <FlatList
            data={FOOD_RECOMMENDATIONS}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.foodItem}>
                <View style={styles.foodIconPlaceholder}>
                   <Ionicons name="restaurant-outline" size={24} color={Colors.primary} />
                </View>
                <Text style={styles.foodText}>{item}</Text>
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
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Spacing.sm,
    paddingHorizontal: Spacing.md,
    height: 44,
  },
  input: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 16,
    color: Colors.text,
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
    color: Colors.text,
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
    color: Colors.textLight,
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
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  foodText: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
  },
});
