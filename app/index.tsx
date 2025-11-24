import { AuthContext } from '@/src/screens/context/AuthContext';
import { Redirect } from 'expo-router';
import { useContext } from 'react';

export default function Index() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
