
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 35,
            paddingBottom: insets.bottom + 30,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require('../assets/images/kitchenkeeper-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />

        <Text style={styles.logo}>KitchenKeeper</Text>

        <Text style={styles.tagline}>
          Smart Tools for Every Kitchen
        </Text>

        <View style={styles.welcomeSection}>
          <Text style={styles.heading}>Welcome Back!</Text>
          <Text style={styles.description}>
            Login to discover your kitchen essentials.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email Address</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={21}
              color="#789078"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#AAAAAA"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <Text style={styles.label}>Password</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={21}
              color="#789078"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#AAAAAA"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />

            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={10}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={21}
                color="#789078"
              />
            </Pressable>
          </View>

          {/* Forgot Password Link */}
          <Pressable
            style={styles.forgotPassword}
            onPress={() => router.push('/forgot-password')}
          >
            <Text style={styles.forgotPasswordText}>
              Forgot Password?
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.loginButton,
              loading && styles.disabledButton,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Logging in...' : 'Login'}
            </Text>

            <Ionicons
              name="arrow-forward"
              size={20}
              color="#FFFFFF"
            />
          </Pressable>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>
              Don't have an account?
            </Text>

            <Pressable onPress={() => router.push('/signup')}>
              <Text style={styles.signupLink}>
                {' '}Sign Up
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.footer}>
          <Ionicons
            name="leaf-outline"
            size={18}
            color="#789078"
          />

          <Text style={styles.footerText}>
            Make every meal special.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },

  logoImage: {
    width: 135,
    height: 135,
    alignSelf: 'center',
    marginBottom: 15,
  },

  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#386641',
    textAlign: 'center',
  },

  tagline: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'center',
    marginTop: 7,
  },

  welcomeSection: {
    marginTop: 45,
    marginBottom: 28,
  },

  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#263D2A',
    marginBottom: 8,
  },

  description: {
    fontSize: 13,
    color: '#888888',
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 9,
    marginTop: 17,
  },

  inputContainer: {
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8DE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    marginLeft: 12,
    paddingVertical: 10,
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 12,
    marginBottom: 5,
    paddingVertical: 5,
  },

  forgotPasswordText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#386641',
  },

  loginButton: {
    height: 55,
    backgroundColor: '#386641',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },

  disabledButton: {
    opacity: 0.6,
  },

  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },

  signupText: {
    fontSize: 13,
    color: '#777777',
  },

  signupLink: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#386641',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
    gap: 7,
  },

  footerText: {
    fontSize: 12,
    color: '#789078',
  },
});

