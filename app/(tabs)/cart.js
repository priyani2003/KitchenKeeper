
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
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShopContext } from '../../context/ShopContext';

export default function CartScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    cart,
    removeFromCart,
    addToCart,
    decreaseQuantity,
  } = useContext(ShopContext);

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity || 0),
    0
  );

  const formatPrice = (price) =>
    Number(price).toLocaleString('en-US');

  const renderCartItem = ({ item }) => (
    <View style={styles.card}>
      {item.image ? (
        <Image
          source={
            typeof item.image === 'string'
              ? { uri: item.image }
              : item.image
          }
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Ionicons name="image-outline" size={30} color="#999" />
        </View>
      )}

      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.price}>
          Rs. {formatPrice(item.price)}
        </Text>

        <Text style={styles.subtotal}>
          Subtotal: Rs. {formatPrice(
            Number(item.price) * Number(item.quantity || 0)
          )}
        </Text>

        <View style={styles.quantityRow}>
          <Pressable
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </Pressable>

          <Text style={styles.quantity}>
            {item.quantity}
          </Text>

          <Pressable
            style={styles.quantityButton}
            onPress={() => addToCart(item, 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>
      </View>

      <Pressable
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#D9534F" />
        <Text style={styles.removeText}>Remove</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { marginTop: insets.top + 15 },
        ]}
      >
        My Shopping Cart 🛒
      </Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderCartItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="cart-outline"
              size={65}
              color="#A5B99A"
            />

            <Text style={styles.emptyText}>
              Your cart is empty.
            </Text>

            <Text style={styles.emptySubText}>
              Explore our products and add your favourites!
            </Text>
          </View>
        }
      />

      {cart.length > 0 && (
        <View
          style={[
            styles.footer,
            { marginBottom: Math.max(insets.bottom, 0) },
          ]}
        >
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>

            <Text style={styles.total}>
              Rs. {formatPrice(total)}
            </Text>
          </View>

          <Pressable
            style={styles.checkoutButton}
            onPress={() => router.push('/checkout')}
          >
            <Text style={styles.checkoutText}>
              Proceed to Checkout
            </Text>

            <Ionicons
              name="arrow-forward"
              size={20}
              color="#FFFFFF"
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#386641',
    marginBottom: 20,
  },

  list: {
    paddingBottom: 15,
    flexGrow: 1,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  image: {
    width: 80,
    height: 95,
    borderRadius: 9,
    backgroundColor: '#F0F0F0',
  },

  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
  },

  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#386641',
    marginTop: 5,
  },

  subtotal: {
    fontSize: 11,
    color: '#777777',
    marginTop: 4,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  quantityButton: {
    backgroundColor: '#E9F5DB',
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#386641',
  },

  quantity: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },

  removeButton: {
    alignItems: 'center',
    padding: 5,
  },

  removeText: {
    fontSize: 10,
    color: '#D9534F',
    fontWeight: '600',
    marginTop: 3,
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 70,
  },

  emptyText: {
    textAlign: 'center',
    color: '#555555',
    fontSize: 17,
    fontWeight: '600',
    marginTop: 15,
  },

  emptySubText: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 8,
  },

  footer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },

  total: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#386641',
  },

  checkoutButton: {
    backgroundColor: '#386641',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

