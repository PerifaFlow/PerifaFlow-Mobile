import { AuthContext } from '@/src/screens/context/AuthContext';
import React, { useContext } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair do PerifaFlow?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => signOut() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu perfil</Text>

      <Text style={styles.label}>Nome de usuário</Text>
      <Text style={styles.value}>{user?.username}</Text>

      <Text style={styles.label}>E-mail</Text>
      <Text style={styles.value}>{user?.email}</Text>

      <Text style={[styles.label, { marginTop: 24 }]}>Sobre seu uso</Text>
      <Text style={styles.value}>
        Use o PerifaFlow sempre que for estudar para registrar seu bem-estar. Isso ajuda você,
        seu grupo e a instituição a entenderem quando o ambiente está favorecendo o aprendizado.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#060608', padding: 16, paddingTop: 60 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 16 },
  label: { color: '#AAA', marginTop: 8, fontSize: 13 },
  value: { color: '#FFF', fontSize: 15 },
  button: {
    marginTop: 32,
    backgroundColor: '#FF005C',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});
