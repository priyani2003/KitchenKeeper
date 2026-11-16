
import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShopContext } from '../context/ShopContext';

export default function OrdersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { orders } = useContext(ShopContext);

  const formatPrice = (value) =>
    Number(value).toLocaleString('en-US');

  const formatDate = (date) => {
    if (!date) return 'Date unavailable';

    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { paddingTop: insets.top + 10 },
        ]}
      >
        <Pressable
          onPress={() => router.replace('/(tabs)/profile')}
          hitSlop={15}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={25}
            color="#386641"
          />
        </Pressable>

        <Text style={styles.headerTitle}>My Orders</Text>

        <View style={{ width: 35 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="receipt-outline"
              size={75}
              color="#A5B99D"
            />

            <Text style={styles.emptyTitle}>No Orders Yet</Text>

            <Text style={styles.emptyText}>
              Your placed orders will appear here.
            </Text>

            <Pressable
              style={styles.shopButton}
              onPress={() => router.replace('/(tabs)')}
            >
              <Text style={styles.shopButtonText}>
                Start Shopping
              </Text>
            </Pressable>
          </View>
        ) : (
          orders.map((order) => (
            <View style={styles.orderCard} key={order.id}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderLabel}>Order ID</Text>
                  <Text style={styles.orderId}>{order.id}</Text>
                </View>

                <Ionicons
                  name="receipt-outline"
                  size={28}
                  color="#386641"
                />
              </View>

              <Text style={styles.date}>
                Ordered on: {formatDate(order.createdAt)}
              </Text>

              <View style={styles.divider} />

              <Text style={styles.sectionTitle}>Ordered Items</Text>

              {(order.items || []).map((item, index) => (
                <View
                  style={styles.itemRow}
                  key={`${order.id}-${item.id}-${index}`}
                >
                  <Text style={styles.itemName}>
                    {item.name} × {item.quantity}
                  </Text>

                  <Text style={styles.itemPrice}>
                    Rs. {formatPrice(
                      Number(item.price) * Number(item.quantity || 1)
                    )}
                  </Text>
                </View>
              ))}

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Customer</Text>
                <Text style={styles.infoValue}>{order.name}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{order.phone}</Text>
              </View>

              <View style={styles.addressContainer}>
                <Text style={styles.infoLabel}>Delivery Address</Text>
                <Text style={styles.addressText}>{order.address}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Payment</Text>
                <Text style={styles.infoValue}>
                  {order.paymentMethod}
                </Text>
              </View>

              <View style={styles.statusContainer}>
                <Ionicons
                  name="checkmark-circle"
                  size={17}
                  color="#386641"
                />

                <Text style={styles.statusText}>
                  {order.status}
                </Text>
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>

                <Text style={styles.totalAmount}>
                  Rs. {formatPrice(order.total)}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 18,
    backgroundColor: '#FFFFFF',
  },

  backButton: {
    padding: 5,
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#386641',
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#386641',
    marginTop: 18,
  },

  emptyText: {
    color: '#777',
    marginTop: 8,
    textAlign: 'center',
  },

  shopButton: {
    backgroundColor: '#386641',
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 9,
    marginTop: 22,
  },

  shopButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderLabel: {
    fontSize: 12,
    color: '#888',
  },

  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#386641',
    marginTop: 4,
  },

  date: {
    color: '#888',
    fontSize: 12,
    marginTop: 10,
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 13,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#386641',
    marginBottom: 12,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },

  itemName: {
    flex: 1,
    fontSize: 13,
    color: '#555',
  },

  itemPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },

  infoLabel: {
    fontSize: 13,
    color: '#777',
  },

  infoValue: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    textAlign: 'right',
  },

  addressContainer: {
    marginBottom: 12,
  },

  addressText: {
    fontSize: 13,
    color: '#333',
    marginTop: 5,
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0F6EC',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },

  statusText: {
    flex: 1,
    color: '#386641',
    fontSize: 12,
    fontWeight: '600',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },

  totalAmount: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#386641',
  },
});

