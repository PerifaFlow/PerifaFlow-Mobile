import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { api, setAuthToken } from '../services/api';

interface User {
  id: string;
  username: string;
  email: string;
}

interface LoginResponse {
  id: string;
  token: string;
  message: string;
}

interface UserResponse {
  id: string;
  username: string;
  email: string;
  password: string;
}

interface SignUpPayload {
  username: string;
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signing: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: SignUpPayload) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);

  useEffect(() => {
    const loadStorage = async () => {
      try {
        const [storedUser, storedToken] = await Promise.all([
          AsyncStorage.getItem('@perifaflow:user'),
          AsyncStorage.getItem('@perifaflow:token'),
        ]);

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setAuthToken(storedToken);
        }
      } catch (err) {
        console.log('Erro ao carregar sessão:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStorage();
  }, []);

  const signIn = async (email: string, password: string) => {
    setSigning(true);
    try {
      const { data } = await api.post<LoginResponse>('/Auth/login', { email, password });
      const { id, token } = data;

      setAuthToken(token);

      const userRes = await api.get<UserResponse>(`/User/${id}`);

      const appUser: User = {
        id: userRes.data.id,
        username: userRes.data.username,
        email: userRes.data.email,
      };

      setUser(appUser);

      await AsyncStorage.setItem('@perifaflow:user', JSON.stringify(appUser));
      await AsyncStorage.setItem('@perifaflow:token', token);
    } catch (err) {
      console.log('Erro no login:', err);
      throw err;
    } finally {
      setSigning(false);
    }
  };

  const signUp = async (payload: SignUpPayload) => {
    setSigning(true);
    try {
      await api.post('/Auth/register', {
        username: payload.username,
        email: payload.email,
        password: payload.password,
      });

      await signIn(payload.email, payload.password);
    } catch (err) {
      console.log('Erro no cadastro:', err);
      throw err;
    } finally {
      setSigning(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    setAuthToken(undefined);
    await AsyncStorage.multiRemove(['@perifaflow:user', '@perifaflow:token']);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signing,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
