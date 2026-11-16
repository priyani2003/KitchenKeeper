
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Error', 'Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      await signUp(name, email, password);

      Alert.alert(
        'Account Created!',
        'Welcome to KitchenKeeper!',
        [
          {
            text: 'Continue',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
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
            paddingTop: insets.top + 25,
            paddingBottom: insets.bottom + 30,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace('/login')}
        >
          <Ionicons name="arrow-back" size={23} color="#386641" />
        </Pressable>

        {/* KitchenKeeper Logo */}
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
          <Text style={styles.heading}>Create Account</Text>
          <Text style={styles.description}>
            Join us and discover your kitchen essentials.
          </Text>
        </View>

        <Text style={styles.label}>Full Name</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={21} color="#789078" />
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#AAAAAA"
            value={name}
            onChangeText={setName}
          />
        </View>

        <Text style={styles.label}>Email Address</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={21} color="#789078" />
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
            placeholder="Create a password"
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

        <Text style={styles.label}>Confirm Password</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={21}
            color="#789078"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#AAAAAA"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
        </View>

        <Pressable
          style={[styles.signupButton, loading && styles.disabledButton]}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.signupButtonText}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </Pressable>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>
            Already have an account?
          </Text>
          <Pressable onPress={() => router.replace('/login')}>
            <Text style={styles.loginLink}> Login</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Ionicons name="leaf-outline" size={18} color="#789078" />
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
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E5EEDC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  logoImage: {
    width: 135,
    height: 135,
    alignSelf: 'center',
    marginBottom: 12,
  },

  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#386641',
    textAlign: 'center',
  },

  tagline: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'center',
    marginTop: 6,
  },

  welcomeSection: {
    marginTop: 30,
    marginBottom: 12,
  },

  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#263D2A',
    marginBottom: 7,
  },

  description: {
    fontSize: 13,
    color: '#888888',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginTop: 17,
    marginBottom: 8,
  },

  inputContainer: {
    height: 53,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8DE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    fontSize: 13,
    color: '#333333',
    marginLeft: 11,
    paddingVertical: 10,
  },

  signupButton: {
    height: 55,
    backgroundColor: '#386641',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    gap: 10,
  },

  disabledButton: {
    opacity: 0.6,
  },

  signupButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
  },

  loginText: {
    fontSize: 13,
    color: '#777777',
  },

  loginLink: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#386641',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    gap: 7,
  },

  footerText: {
    fontSize: 12,
    color: '#789078',
  },
});

