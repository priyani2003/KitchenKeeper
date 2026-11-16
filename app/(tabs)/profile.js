
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useAuth } from '../../context/AuthContext';

const NOTIFICATION_KEY = 'kitchenkeeper_notifications_enabled';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotificationSetting = async () => {
      try {
        const savedSetting = await AsyncStorage.getItem(NOTIFICATION_KEY);

        if (savedSetting === 'true') {
          const permission = await Notifications.getPermissionsAsync();

          if (permission.granted) {
            setNotificationsEnabled(true);
          } else {
            setNotificationsEnabled(false);
            await AsyncStorage.setItem(NOTIFICATION_KEY, 'false');
          }
        }
      } catch (error) {
        console.log('Could not load notification setting:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNotificationSetting();
  }, []);

  const toggleNotifications = async (value) => {
    try {
      if (value) {
        const permission = await Notifications.requestPermissionsAsync();

        if (!permission.granted) {
          Alert.alert(
            'Permission Required',
            'Please allow notifications in your iPhone settings to enable this feature.'
          );
          return;
        }

        setNotificationsEnabled(true);
        await AsyncStorage.setItem(NOTIFICATION_KEY, 'true');

        Alert.alert(
          'Notifications Enabled',
          'You can now receive KitchenKeeper notifications.'
        );
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
        await Notifications.dismissAllNotificationsAsync();

        setNotificationsEnabled(false);
        await AsyncStorage.setItem(NOTIFICATION_KEY, 'false');

        Alert.alert(
          'Notifications Disabled',
          'KitchenKeeper notifications have been turned off.'
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Could not update the notification setting.');
      console.log(error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from KitchenKeeper?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/login');
            } catch (error) {
              Alert.alert('Error', 'Could not logout. Please try again.');
              console.log(error);
            }
          },
        },
      ]
    );
  };

  const MenuItem = ({ icon, title, subtitle, onPress, danger = false }) => (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={icon}
          size={23}
          color={danger ? '#C0392B' : '#386641'}
        />
      </View>

      <View style={styles.menuTextContainer}>
        <Text style={[styles.menuTitle, danger && styles.dangerText]}>
          {title}
        </Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#999"
      />
    </Pressable>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 20 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileIcon}>
          <Ionicons name="person" size={42} color="#386641" />
        </View>

        <Text style={styles.title}>My Profile</Text>

        <Text style={styles.welcome}>
          Welcome, {user?.name || 'Customer'}!
        </Text>

        <Text style={styles.email}>
          {user?.email || ''}
        </Text>

        <Text style={styles.subtitle}>
          Smart Tools for Every Kitchen
        </Text>
      </View>

      {/* Account Section */}
      <Text style={styles.sectionTitle}>My Account</Text>

      <View style={styles.menuContainer}>
        <MenuItem
          icon="heart-outline"
          title="My Favorites"
          subtitle="View your saved products"
          onPress={() => router.push('/(tabs)/favorites')}
        />

        <View style={styles.divider} />

        <MenuItem
          icon="receipt-outline"
          title="My Orders"
          subtitle="View your previous orders"
          onPress={() => router.push('/orders')}
        />

        <View style={styles.divider} />

        <MenuItem
          icon="location-outline"
          title="My Addresses"
          subtitle="Manage your delivery addresses"
          onPress={() => router.push('/addresses')}
        />

        <View style={styles.divider} />

        <MenuItem
          icon="person-circle-outline"
          title="Delivery Information"
          subtitle="Enter your delivery details at checkout"
          onPress={() =>
            Alert.alert(
              'Delivery Information',
              'You can enter your name, phone number and delivery address during checkout.'
            )
          }
        />
      </View>

      {/* More Options */}
      <Text style={styles.sectionTitle}>More</Text>

      <View style={styles.menuContainer}>
        <View style={styles.notificationRow}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="notifications-outline"
              size={23}
              color="#386641"
            />
          </View>

          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Notifications</Text>

            <Text style={styles.menuSubtitle}>
              {notificationsEnabled
                ? 'Notifications are turned ON'
                : 'Notifications are turned OFF'}
            </Text>
          </View>

          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            disabled={loading}
            trackColor={{
              false: '#CCCCCC',
              true: '#8DBB83',
            }}
            thumbColor={
              notificationsEnabled ? '#386641' : '#F4F3F4'
            }
          />
        </View>

        <View style={styles.divider} />

        <MenuItem
          icon="information-circle-outline"
          title="About KitchenKeeper"
          subtitle="Learn more about our app"
          onPress={() =>
            Alert.alert(
              'About KitchenKeeper 🍳',
              'KitchenKeeper is a kitchen shopping application designed to help customers explore and shop for useful kitchen products easily.'
            )
          }
        />

        <View style={styles.divider} />

        <MenuItem
          icon="help-circle-outline"
          title="Help & Support"
          subtitle="Information about using the app"
          onPress={() =>
            Alert.alert(
              'Help & Support',
              'You can explore products, add your favourites, manage your cart and place demo orders through the checkout screen.'
            )
          }
        />
      </View>

      {/* Logout */}
      <Text style={styles.sectionTitle}>Account</Text>

      <View style={styles.menuContainer}>
        <MenuItem
          icon="log-out-outline"
          title="Logout"
          subtitle="Sign out from your account"
          onPress={handleLogout}
          danger
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Ionicons
          name="restaurant-outline"
          size={25}
          color="#386641"
        />

        <Text style={styles.footerTitle}>KitchenKeeper</Text>

        <Text style={styles.footerText}>
          Smart Tools for Every Kitchen
        </Text>

        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 35,
  },

  header: {
    alignItems: 'center',
    paddingVertical: 25,
    marginBottom: 15,
  },

  profileIcon: {
    width: 85,
    height: 85,
    borderRadius: 45,
    backgroundColor: '#E5EEDC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#386641',
    marginBottom: 10,
  },

  welcome: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },

  email: {
    fontSize: 13,
    color: '#777',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 13,
    color: '#777',
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#386641',
    marginBottom: 12,
    marginTop: 10,
  },

  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 22,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 22,
    backgroundColor: '#EDF3E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  menuTextContainer: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  dangerText: {
    color: '#C0392B',
  },

  menuSubtitle: {
    fontSize: 11,
    color: '#888',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 22,
    marginTop: 5,
  },

  footerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#386641',
    marginTop: 7,
  },

  footerText: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },

  version: {
    fontSize: 11,
    color: '#AAAAAA',
    marginTop: 12,
  },
});

