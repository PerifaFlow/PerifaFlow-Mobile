import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TabsHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como você está hoje?</Text>
      <Text style={styles.subtitle}>
        O PerifaFlow ajuda a entender seu bem-estar na quebrada e indica trilhas de estudo
        no ritmo que sua mente aguenta.
      </Text>

      {/* Card de novo registro de bem-estar */}
      <View className="card" style={styles.card}>
        <Text style={styles.cardTitle}>Registrar bem-estar</Text>
        <Text style={styles.cardText}>
          Responda algumas perguntas rápidas sobre energia, ambiente e condição para estudar.
        </Text>

        <Link href="/new-record" asChild>
          <TouchableOpacity style={styles.buttonPrimary}>
            <Text style={styles.buttonPrimaryText}>Novo registro</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Card de histórico */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Histórico da quebrada</Text>
        <Text style={styles.cardText}>
          Veja como seu bem-estar oscilou nos últimos dias e identifique padrões.
        </Text>

        {/* Rota já conhecida pelo router: /(tabs)/explore */}
        <Link href="/(tabs)/explore" asChild>
          <TouchableOpacity style={styles.buttonSecondary}>
            <Text style={styles.buttonSecondaryText}>Ver histórico</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Card de trilhas de estudo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Trilhas de estudo</Text>
        <Text style={styles.cardText}>
          Acesse trilhas pensadas para o seu momento. Comece leve nos dias puxados e avance
          quando a mente estiver voando.
        </Text>

        {/* Aqui o TypeScript ainda não “enxerga” /trilhas, então fazemos um cast */}
        <Link href={'/trilhas' as any} asChild>
          <TouchableOpacity style={styles.buttonSecondary}>
            <Text style={styles.buttonSecondaryText}>Explorar trilhas</Text>
          </TouchableOpacity>
        </Link>
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
  cardText: { fontSize: 13, color: '#CCC', marginBottom: 8 },
  buttonPrimary: {
    backgroundColor: '#FF005C',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPrimaryText: { color: '#FFF', fontWeight: 'bold' },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#FF005C',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSecondaryText: { color: '#FF005C', fontWeight: '600' },
});
