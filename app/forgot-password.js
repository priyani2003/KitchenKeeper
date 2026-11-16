
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

import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim() || !newPassword || !confirmPassword) {
      Alert.alert('Missing Details', 'Please fill in all fields.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert(
        'Weak Password',
        'Password must contain at least 6 characters.'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        'Password Mismatch',
        'New password and confirm password do not match.'
      );
      return;
    }

    try {
      setIsSubmitting(true);

      await resetPassword(email, newPassword);

      Alert.alert(
        'Password Updated',
        'Your password has been changed successfully. Please login with your new password.',
        [
          {
            text: 'Go to Login',
            onPress: () => router.replace('/login'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Password Reset Failed', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Image
            source={require('../assets/images/kitchenkeeper-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Forgot Password?</Text>

          <Text style={styles.subtitle}>
            Enter your registered email and create a new password.
          </Text>

          <Text style={styles.label}>Email Address</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your registered email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>New Password</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter new password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </Pressable>
          </View>

          <Text style={styles.label}>Confirm New Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <Pressable
            style={[
              styles.resetButton,
              isSubmitting && styles.disabledButton,
            ]}
            onPress={handleResetPassword}
            disabled={isSubmitting}
          >
            <Text style={styles.resetButtonText}>
              {isSubmitting ? 'Updating...' : 'Reset Password'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.backButton}
            onPress={() => router.replace('/login')}
          >
            <Text style={styles.backText}>
              Back to Login
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF7',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  formContainer: {
    width: '100%',
  },

  logo: {
    width: 135,
    height: 135,
    alignSelf: 'center',
    marginBottom: 15,
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#315B38',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#FFF',
  },

  passwordContainer: {
    height: 52,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },

  showText: {
    color: '#56865B',
    fontWeight: '600',
    padding: 5,
  },

  resetButton: {
    backgroundColor: '#56865B',
    height: 53,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  disabledButton: {
    opacity: 0.6,
  },

  resetButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  backButton: {
    alignItems: 'center',
    marginTop: 22,
    padding: 10,
  },

  backText: {
    color: '#56865B',
    fontSize: 15,
    fontWeight: '600',
  },
});

