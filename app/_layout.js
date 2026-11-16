
import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  Image,
  Text,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';

import { Stack, useRouter, useSegments } from 'expo-router';

import { AuthProvider, useAuth } from '../context/AuthContext';
import { ShopProvider } from '../context/ShopContext';
import AppStateListener from '../context/AppStateListener';

function RootNavigation() {
  const { user, isLoading } = useAuth();

  const router = useRouter();
  const segments = useSegments();

  const [minimumTimeFinished, setMinimumTimeFinished] = useState(false);

  const rotation = useRef(new Animated.Value(0)).current;

  // Identify the current screen
  const currentScreen = segments[0];

  const isAuthScreen = [
    'login',
    'signup',
    'forgot-password',
  ].includes(currentScreen);

  // Check whether navigation is required
  const shouldRedirect =
    !isLoading &&
    minimumTimeFinished &&
    (
      (!user && !isAuthScreen) ||
      (user && isAuthScreen)
    );

  // Keep splash screen visible for at least 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumTimeFinished(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Continuous dotted-circle animation
  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => animation.stop();
  }, [rotation]);

  // Authentication navigation
  useEffect(() => {
    if (isLoading || !minimumTimeFinished) return;

    if (!user && !isAuthScreen) {
      router.replace('/login');
    } else if (user && isAuthScreen) {
      router.replace('/(tabs)');
    }
  }, [
    user,
    isLoading,
    minimumTimeFinished,
    isAuthScreen,
    router,
  ]);

  // Splash screen
  if (isLoading || !minimumTimeFinished || shouldRedirect) {
    const spin = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={styles.splashContainer}>

        <Image
          source={require('../assets/images/kitchenkeeper-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.appName}>
          KitchenKeeper
        </Text>

        <Animated.View
          style={[
            styles.loaderCircle,
            { transform: [{ rotate: spin }] },
          ]}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  transform: [
                    { rotate: `${index * 45}deg` },
                    { translateY: -15 },
                  ],
                  opacity: 1 - index * 0.09,
                },
              ]}
            />
          ))}
        </Animated.View>

      </View>
    );
  }

  return (
    <>
      <AppStateListener />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="(tabs)" />

        <Stack.Screen
          name="product/[id]"
          options={{
            headerShown: true,
            title: '',
            headerBackTitleVisible: false,
            headerBackButtonDisplayMode: 'minimal',
          }}
        />

        <Stack.Screen
          name="checkout"
          options={{
            headerShown: true,
            title: 'Checkout',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />

        <Stack.Screen name="orders" />
        <Stack.Screen name="addresses" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ShopProvider>
        <RootNavigation />
      </ShopProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#FFF9F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 15,
  },

  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#386641',
    marginTop: 10,
  },

  loaderCircle: {
    width: 34,
    height: 34,
    marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dot: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#56865B',
  },
});

