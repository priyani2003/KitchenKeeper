
import React, { useContext, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';

import { ShopContext } from '../context/ShopContext';

// Display notifications even when the app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function CheckoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const { cart, removeFromCart, addOrder } = useContext(ShopContext);

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [order, setOrder] = useState(null);

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity || 0),
    0
  );

  const formatPrice = (value) =>
    Number(value).toLocaleString('en-US');

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 19);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);

    if (digits.length > 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2);
    }

    return digits;
  };

  // Send a local notification after a successful order
  const sendOrderNotification = async () => {
    try {
      const { status } =
        await Notifications.requestPermissionsAsync();

      if (status !== 'granted') {
        console.log('Notification permission was not granted.');
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🎉 Order Successful!',
          body:
            'Your order has been placed successfully. Thank you for shopping with KitchenKeeper!',
          sound: true,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 2,
        },
      });

      console.log('Order notification scheduled successfully.');
    } catch (error) {
      console.log('Notification error:', error);
    }
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty.');
      return;
    }

    if (!name.trim() || !phone.trim() || !address.trim()) {
      Alert.alert(
        'Missing Information',
        'Please complete all delivery details.'
      );
      return;
    }

    if (!/^[0-9+\-\s]{9,15}$/.test(phone.trim())) {
      Alert.alert(
        'Invalid Phone',
        'Please enter a valid phone number.'
      );
      return;
    }

    const cardDigits = cardNumber.replace(/\s/g, '');

    if (!cardName.trim()) {
      Alert.alert(
        'Missing Card Details',
        'Enter the cardholder name.'
      );
      return;
    }

    if (!/^\d{13,19}$/.test(cardDigits)) {
      Alert.alert(
        'Invalid Card Number',
        'Enter a card number containing 13 to 19 digits.'
      );
      return;
    }

    const expiryParts = expiry.split('/');
    const month = Number(expiryParts[0]);
    const year = Number(expiryParts[1]);

    if (
      !/^\d{2}\/\d{2}$/.test(expiry) ||
      month < 1 ||
      month > 12
    ) {
      Alert.alert(
        'Invalid Expiry Date',
        'Enter expiry date as MM/YY.'
      );
      return;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (
      year < currentYear ||
      (year === currentYear && month < currentMonth)
    ) {
      Alert.alert(
        'Expired Card',
        'Please enter a future expiry date.'
      );
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      Alert.alert(
        'Invalid CVV',
        'Enter a 3 or 4 digit CVV.'
      );
      return;
    }

    // Create the new order
    const newOrder = {
      id: 'KK' + Date.now().toString().slice(-8),
      createdAt: new Date().toISOString(),
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      paymentMethod: 'Card Payment (Demo)',
      total,
      items: cart.map((item) => ({ ...item })),
      status: 'Demo card payment successful',
    };

    // Save the order
    addOrder(newOrder);

    // Send the local notification
    await sendOrderNotification();

    // Show the order confirmation
    setOrder(newOrder);
    setConfirmationVisible(true);
  };

  const finishOrder = () => {
    cart.forEach((item) => removeFromCart(item.id));

    setConfirmationVisible(false);
    router.replace('/(tabs)');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 18,
          paddingBottom: insets.bottom + 35,
        },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Checkout</Text>

      <Text style={styles.subtitle}>
        Complete your delivery and card details to place your order.
      </Text>

      {/* Delivery Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Delivery Information
        </Text>

        <Text style={styles.label}>Customer Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Delivery Address</Text>
        <TextInput
          style={[styles.input, styles.addressInput]}
          placeholder="Enter your delivery address"
          value={address}
          onChangeText={setAddress}
          multiline
        />
      </View>

      {/* Card Payment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Card Payment
        </Text>

        <View style={styles.paymentHeader}>
          <Ionicons
            name="card-outline"
            size={28}
            color="#386641"
          />

          <View style={styles.paymentTextContainer}>
            <Text style={styles.paymentTitle}>
              Card Payment (Demo)
            </Text>

            <Text style={styles.paymentDescription}>
              Enter your card details below.
            </Text>
          </View>

          <Ionicons
            name="checkmark-circle"
            size={23}
            color="#386641"
          />
        </View>

        <View style={styles.cardForm}>
          <Text style={styles.label}>Cardholder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name on card"
            value={cardName}
            onChangeText={setCardName}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChangeText={(value) =>
              setCardNumber(formatCardNumber(value))
            }
            keyboardType="number-pad"
            maxLength={23}
          />

          <View style={styles.cardRow}>
            <View style={styles.cardHalf}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                value={expiry}
                onChangeText={(value) =>
                  setExpiry(formatExpiry(value))
                }
                keyboardType="number-pad"
                maxLength={5}
              />
            </View>

            <View style={styles.cardHalf}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                value={cvv}
                onChangeText={(value) =>
                  setCvv(value.replace(/\D/g, '').slice(0, 4))
                }
                keyboardType="number-pad"
                secureTextEntry
                maxLength={4}
              />
            </View>
          </View>

          <View style={styles.secureNotice}>
            <Ionicons
              name="lock-closed-outline"
              size={17}
              color="#386641"
            />

            <Text style={styles.secureNoticeText}>
              Demo form only. Card details are not stored or sent anywhere.
            </Text>
          </View>
        </View>

        <Text style={styles.demoNotice}>
          University project demonstration only. No real bank transaction
          or payment will take place.
        </Text>
      </View>

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>

        {cart.map((item) => (
          <View
            style={styles.summaryRow}
            key={String(item.id)}
          >
            <Text style={styles.summaryName}>
              {item.name} × {item.quantity}
            </Text>

            <Text style={styles.summaryPrice}>
              Rs.{' '}
              {formatPrice(
                Number(item.price) * Number(item.quantity)
              )}
            </Text>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>

          <Text style={styles.totalAmount}>
            Rs. {formatPrice(total)}
          </Text>
        </View>
      </View>

      {/* Pay Now Button */}
      <Pressable
        style={[
          styles.placeOrderButton,
          cart.length === 0 && styles.disabledButton,
        ]}
        onPress={placeOrder}
        disabled={cart.length === 0}
      >
        <Text style={styles.placeOrderText}>Pay Now</Text>

        <Ionicons
          name="arrow-forward"
          size={20}
          color="#FFFFFF"
        />
      </Pressable>

      {/* Order Confirmation */}
      <Modal
        visible={confirmationVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmationVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons
              name="checkmark-circle"
              size={65}
              color="#386641"
            />

            <Text style={styles.modalTitle}>
              Payment Successful!
            </Text>

            <Text style={styles.orderId}>
              Order ID: {order?.id}
            </Text>

            <Text style={styles.modalText}>
              Thank you, {order?.name}.
            </Text>

            <Text style={styles.modalText}>
              Payment: {order?.paymentMethod}
            </Text>

            <Text style={styles.modalTotal}>
              Total: Rs. {formatPrice(order?.total || 0)}
            </Text>

            <Text style={styles.demoNotice}>
              {order?.status}. This is a simulated payment confirmation.
            </Text>

            <Pressable
              style={styles.doneButton}
              onPress={finishOrder}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },

  content: {
    paddingHorizontal: 18,
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#386641',
  },

  subtitle: {
    color: '#777',
    marginTop: 6,
    marginBottom: 20,
  },

  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 13,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#386641',
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 7,
  },

  input: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 9,
    padding: 12,
    fontSize: 14,
    marginBottom: 15,
    color: '#333',
  },

  addressInput: {
    minHeight: 85,
    textAlignVertical: 'top',
  },

  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },

  paymentTextContainer: {
    flex: 1,
  },

  paymentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },

  paymentDescription: {
    fontSize: 11,
    color: '#777',
    marginTop: 4,
  },

  cardForm: {
    backgroundColor: '#F8FBF5',
    borderWidth: 1,
    borderColor: '#DCE8D5',
    borderRadius: 10,
    padding: 13,
  },

  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },

  cardHalf: {
    flex: 1,
  },

  secureNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 5,
  },

  secureNoticeText: {
    flex: 1,
    fontSize: 11,
    color: '#386641',
  },

  demoNotice: {
    fontSize: 11,
    color: '#888',
    lineHeight: 17,
    marginTop: 12,
    textAlign: 'center',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 10,
  },

  summaryName: {
    flex: 1,
    fontSize: 12,
    color: '#555',
  },

  summaryPrice: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },

  totalRow: {
    borderTopWidth: 1,
    borderColor: '#EEEEEE',
    paddingTop: 14,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#386641',
  },

  placeOrderButton: {
    backgroundColor: '#386641',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  disabledButton: {
    opacity: 0.5,
  },

  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#386641',
    marginTop: 12,
  },

  orderId: {
    fontWeight: 'bold',
    color: '#555',
    marginTop: 12,
  },

  modalText: {
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },

  modalTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#386641',
    marginTop: 15,
  },

  doneButton: {
    backgroundColor: '#386641',
    width: '100%',
    padding: 14,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 20,
  },

  doneButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

