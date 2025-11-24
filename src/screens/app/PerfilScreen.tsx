import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function PerfilScreen() {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu perfil</Text>

      <Text style={styles.label}>Nome de usuário</Text>
      <Text style={styles.value}>{user?.username ?? 'Não identificado'}</Text>

      <Text style={styles.label}>E-mail</Text>
      <Text style={styles.value}>{user?.email ?? 'Não informado'}</Text>

      <Text style={[styles.label, { marginTop: 24 }]}>Como usar este app</Text>
      <Text style={styles.value}>
        Antes de iniciar ou continuar uma trilha de estudo, registre seu bem-estar. Use os dados
        do histórico para entender quais horários, locais e rotinas funcionam melhor para você.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#060608', padding: 16, paddingTop: 60 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 16 },
  label: { color: '#AAA', marginTop: 8, fontSize: 13 },
  value: { color: '#FFF', fontSize: 15 },
});
