import { AuthContext } from '@/src/screens/context/AuthContext';
import { Link, useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Login() {
  const { signIn, signing } = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }

    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch {
      Alert.alert(
        'Erro ao entrar',
        'Não conseguimos validar seu acesso. Confira e-mail e senha ou tente novamente em alguns minutos.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PerifaFlow</Text>
      <Text style={styles.subtitle}>
        Antes da trilha de estudos, a gente cuida do seu bem-estar.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail institucional"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, signing && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={signing}
      >
        {signing ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>

      <Link href="/signup" style={styles.link}>
        Ainda não tenho conta
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#060608', padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFF' },
  subtitle: { fontSize: 14, color: '#CCC', marginBottom: 32, marginTop: 4 },
  input: {
    width: '100%',
    backgroundColor: '#111',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFF',
    marginBottom: 12,
  },
  button: {
    width: '100%',
    backgroundColor: '#FF005C',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  link: { color: '#00FFC2', marginTop: 16, textAlign: 'center' },
});
