import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como você está hoje?</Text>
      <Text style={styles.subtitle}>
        Este módulo do PerifaFlow mostra como o bem-estar influencia diretamente suas trilhas de estudo.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Registrar bem-estar</Text>
        <Text style={styles.cardText}>
          Registre energia, ambiente e condição antes de começar os estudos. Esses dados depois
          alimentam dashboards e decisões pedagógicas.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Histórico</Text>
        <Text style={styles.cardText}>
          Acompanhe como seu estado físico e emocional oscila ao longo da semana e veja como isso
          bate com o seu desempenho nas trilhas.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Trilhas de estudo</Text>
        <Text style={styles.cardText}>
          As trilhas são pensadas para acompanhar seu ritmo. Em dias mais pesados, você pode focar
          em conteúdos mais leves ou de revisão.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#060608', padding: 16, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#DDD', marginBottom: 16 },
  card: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#FFF', marginBottom: 4 },
  cardText: { fontSize: 13, color: '#CCC' },
});
