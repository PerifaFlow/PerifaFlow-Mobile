import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const COMMIT_HASH = 'COLOQUE_O_HASH_DO_COMMIT_AQUI';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PerifaFlow — o futuro pulsa da quebrada</Text>

      <Text style={styles.text}>
        O PerifaFlow é um app que conecta bem-estar e estudo na quebrada. Antes de empurrar o
        aluno para mais uma trilha, entendemos se ele está em condição emocional e física de
        absorver o conteúdo.
      </Text>

      <Text style={[styles.text, { marginTop: 16 }]}>
        A partir dos registros de energia, ambiente e condição, o app cria um histórico do
        estudante e permite que educadores entendam quando ajustar carga de estudo, apoio ou
        dinamizar a aula.
      </Text>

      <Text style={[styles.text, { marginTop: 16 }]}>Disciplina: Mobile</Text>
      <Text style={styles.text}>Global Solution 2025</Text>

      <Text style={[styles.text, { marginTop: 16 }]}>Integrantes:</Text>
      <Text style={styles.text}>• Gabriel Gomes Mancera — RM 555427</Text>
      <Text style={styles.text}>• Juliana de Andrade Sousa — RM 558834</Text>
      <Text style={styles.text}>• Victor Hugo Carvalho Pereira — RM 558550</Text>

      <Text style={[styles.text, { marginTop: 16 }]}>Versão do app: 1.0.0</Text>
      <Text style={styles.text}>Commit: {COMMIT_HASH}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#060608', padding: 16, paddingTop: 60 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 16 },
  text: { color: '#DDD', marginBottom: 4, fontSize: 13 },
});
