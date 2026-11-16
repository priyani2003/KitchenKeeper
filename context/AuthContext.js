
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

const USERS_KEY = 'kitchenkeeper_users';
const SESSION_KEY = 'kitchenkeeper_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore the customer's login session
  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedSession = await AsyncStorage.getItem(SESSION_KEY);

        if (savedSession) {
          setUser(JSON.parse(savedSession));
        }
      } catch (error) {
        console.log('Session loading error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  // Register a new customer
  const signUp = async (name, email, password) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      throw new Error('Please fill in all fields.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      throw new Error('Please enter a valid email address.');
    }

    if (password.length < 6) {
      throw new Error('Password must contain at least 6 characters.');
    }

    const savedUsers = await AsyncStorage.getItem(USERS_KEY);
    const users = savedUsers ? JSON.parse(savedUsers) : [];

    const existingUser = users.find(
      (item) => item.email === cleanEmail
    );

    if (existingUser) {
      throw new Error('This email is already registered.');
    }

    const newUser = {
      id: Date.now().toString(),
      name: cleanName,
      email: cleanEmail,
      password,
    };

    const updatedUsers = [...users, newUser];

    await AsyncStorage.setItem(
      USERS_KEY,
      JSON.stringify(updatedUsers)
    );

    const loggedInUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    await AsyncStorage.setItem(
      SESSION_KEY,
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return loggedInUser;
  };

  // Login an existing customer
  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      throw new Error('Please enter your email and password.');
    }

    const savedUsers = await AsyncStorage.getItem(USERS_KEY);
    const users = savedUsers ? JSON.parse(savedUsers) : [];

    const existingUser = users.find(
      (item) =>
        item.email === cleanEmail &&
        item.password === password
    );

    if (!existingUser) {
      throw new Error('Incorrect email or password.');
    }

    const loggedInUser = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };

    await AsyncStorage.setItem(
      SESSION_KEY,
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return loggedInUser;
  };

  // Reset the customer's password
  const resetPassword = async (email, newPassword) => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !newPassword) {
      throw new Error('Please fill in all fields.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      throw new Error('Please enter a valid email address.');
    }

    if (newPassword.length < 6) {
      throw new Error('Password must contain at least 6 characters.');
    }

    const savedUsers = await AsyncStorage.getItem(USERS_KEY);
    const users = savedUsers ? JSON.parse(savedUsers) : [];

    const userIndex = users.findIndex(
      (item) => item.email === cleanEmail
    );

    if (userIndex === -1) {
      throw new Error('No account found with this email address.');
    }

    const updatedUsers = [...users];

    updatedUsers[userIndex] = {
      ...updatedUsers[userIndex],
      password: newPassword,
    };

    await AsyncStorage.setItem(
      USERS_KEY,
      JSON.stringify(updatedUsers)
    );
  };

  // Logout the customer
  const logout = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signUp,
        login,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}

