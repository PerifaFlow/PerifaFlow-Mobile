import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function RootNavigator() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RootNavigator (modo demo)</Text>
      <Text style={styles.text}>
        A navegação principal do PerifaFlow é feita pelo Expo Router, usando a pasta
        /app. Este arquivo fica aqui apenas para mostrar uma possível estrutura com
        React Navigation na pasta src/navigation.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#060608' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  text: { fontSize: 13, color: '#DDD' },
});
