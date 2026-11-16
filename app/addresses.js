
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShopContext } from '../context/ShopContext';

export default function AddressesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
  } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setName('');
    setPhone('');
    setAddress('');
    setCity('');
    setPostalCode('');
    setEditingId(null);
  };

  const saveAddress = () => {
    if (
      !name.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim()
    ) {
      Alert.alert(
        'Missing Information',
        'Please fill in your name, phone number, address and city.'
      );
      return;
    }

    if (!/^[0-9]{10}$/.test(phone.trim())) {
      Alert.alert(
        'Invalid Phone Number',
        'Please enter a valid 10-digit phone number.'
      );
      return;
    }

    const addressData = {
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
    };

    if (editingId) {
      updateAddress({
        ...addressData,
        id: editingId,
      });

      Alert.alert('Success', 'Address updated successfully.');
    } else {
      addAddress(addressData);

      Alert.alert('Success', 'Address added successfully.');
    }

    resetForm();
  };

  const editAddress = (item) => {
    setName(item.name);
    setPhone(item.phone);
    setAddress(item.address);
    setCity(item.city);
    setPostalCode(item.postalCode || '');
    setEditingId(item.id);
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteAddress(id),
        },
      ]
    );
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

        <Text style={styles.headerTitle}>My Addresses</Text>

        <View style={{ width: 35 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Address Form */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            {editingId ? 'Edit Address' : 'Add New Address'}
          </Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 10-digit phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />

          <Text style={styles.label}>Street Address</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Enter your house number and street"
            value={address}
            onChangeText={setAddress}
            multiline
          />

          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your city"
            value={city}
            onChangeText={setCity}
          />

          <Text style={styles.label}>Postal Code (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter postal code"
            value={postalCode}
            onChangeText={setPostalCode}
            keyboardType="number-pad"
          />

          <Pressable
            style={styles.saveButton}
            onPress={saveAddress}
          >
            <Ionicons
              name={editingId ? 'save-outline' : 'add-circle-outline'}
              size={20}
              color="#FFFFFF"
            />

            <Text style={styles.saveButtonText}>
              {editingId ? 'Update Address' : 'Save Address'}
            </Text>
          </Pressable>

          {editingId && (
            <Pressable
              style={styles.cancelButton}
              onPress={resetForm}
            >
              <Text style={styles.cancelButtonText}>
                Cancel Editing
              </Text>
            </Pressable>
          )}
        </View>

        {/* Saved Addresses */}
        <Text style={styles.sectionTitle}>
          Saved Addresses ({addresses.length})
        </Text>

        {addresses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="location-outline"
              size={65}
              color="#A5B99D"
            />

            <Text style={styles.emptyTitle}>
              No Saved Addresses
            </Text>

            <Text style={styles.emptyText}>
              Add your delivery address using the form above.
            </Text>
          </View>
        ) : (
          addresses.map((item) => (
            <View
              style={styles.addressCard}
              key={item.id}
            >
              <View style={styles.addressHeader}>
                <View style={styles.addressIcon}>
                  <Ionicons
                    name="home-outline"
                    size={23}
                    color="#386641"
                  />
                </View>

                <Text style={styles.addressName}>
                  {item.name}
                </Text>
              </View>

              <Text style={styles.detailText}>
                {item.phone}
              </Text>

              <Text style={styles.detailText}>
                {item.address}
              </Text>

              <Text style={styles.detailText}>
                {item.city}
                {item.postalCode
                  ? ` - ${item.postalCode}`
                  : ''}
              </Text>

              <View style={styles.actionRow}>
                <Pressable
                  style={styles.editButton}
                  onPress={() => editAddress(item)}
                >
                  <Ionicons
                    name="create-outline"
                    size={18}
                    color="#386641"
                  />
                  <Text style={styles.editText}>Edit</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => confirmDelete(item.id)}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color="#D9534F"
                  />
                  <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
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
    paddingBottom: 35,
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 17,
    marginBottom: 25,
    elevation: 2,
  },

  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#386641',
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
  },

  multilineInput: {
    minHeight: 75,
    textAlignVertical: 'top',
  },

  saveButton: {
    backgroundColor: '#386641',
    borderRadius: 9,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 5,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  cancelButton: {
    alignItems: 'center',
    padding: 12,
    marginTop: 5,
  },

  cancelButtonText: {
    color: '#777777',
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#386641',
    marginBottom: 14,
  },

  emptyContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 35,
    borderRadius: 13,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#386641',
    marginTop: 12,
  },

  emptyText: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'center',
    marginTop: 7,
  },

  addressCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 13,
    marginBottom: 14,
    elevation: 2,
  },

  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDF3E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#386641',
  },

  detailText: {
    fontSize: 13,
    color: '#555555',
    marginBottom: 7,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    marginTop: 10,
    paddingTop: 12,
    gap: 22,
  },

  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  editText: {
    color: '#386641',
    fontWeight: '600',
  },

  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  deleteText: {
    color: '#D9534F',
    fontWeight: '600',
  },
});

