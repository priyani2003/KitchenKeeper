
import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShopContext } from '../../context/ShopContext';

export default function FavoritesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { favorites, toggleFavorite } = useContext(ShopContext);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { marginTop: insets.top + 15 },
        ]}
      >
        My Favorites ❤️
      </Text>

      <Text style={styles.subtitle}>
        Your favourite kitchen products
      </Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No favorite products yet.
            {'\n'}Tap the heart on a product to add it here.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/product/${item.id}`)}
          >
            <Image
              source={
                typeof item.image === 'string'
                  ? { uri: item.image }
                  : item.image
              }
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.details}>
              <Text style={styles.name} numberOfLines={2}>
                {item.name}
              </Text>

              <Text style={styles.price}>
                Rs. {item.price.toLocaleString()}
              </Text>
            </View>

            <Pressable
              style={styles.removeButton}
              onPress={() => toggleFavorite(item)}
            >
              <Text style={styles.remove}>♥</Text>
            </Pressable>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#386641',
  },

  subtitle: {
    color: '#777',
    marginTop: 5,
    marginBottom: 18,
  },

  list: {
    paddingBottom: 20,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  image: {
    width: 85,
    height: 85,
    borderRadius: 9,
    backgroundColor: '#F0F0F0',
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },

  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#386641',
    marginTop: 8,
  },

  removeButton: {
    padding: 10,
  },

  remove: {
    fontSize: 24,
    color: '#D9534F',
  },

  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 60,
    lineHeight: 24,
  },
});

