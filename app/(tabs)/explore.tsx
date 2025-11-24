import { useRecords } from '@/src/screens/context/RecordsContext';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type RitmoRecord = {
  id: number | string;
  bairro: string;
  createdAt: string; // ISO
  turno: 'MANHA' | 'TARDE' | 'NOITE' | string;
  energia: number;   // 0..2
  ambiente: number;  // 0..2
  condicao: number;  // 0..2
  nota?: string | null;
};

export default function HistoryTab() {
  const { records } = useRecords() as { records: RitmoRecord[] };

  function formatTurno(turno: string) {
    if (turno === 'MANHA') return 'Manhã';
    if (turno === 'TARDE') return 'Tarde';
    if (turno === 'NOITE') return 'Noite';
    return turno;
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function labelNivel(valor: number) {
    if (valor === 0) return 'Baixo';
    if (valor === 1) return 'Médio';
    return 'Alto';
  }

  const listaVazia = !records || records.length === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de bem-estar</Text>
      <Text style={styles.subtitle}>
        Cada registro mostra se a quebrada e sua energia estavam ajudando ou atrapalhando
        seu estudo naquele momento.
      </Text>

      {listaVazia ? (
        <Text style={styles.emptyText}>
          Você ainda não registrou seu bem-estar. Toque em &quot;Novo registro&quot; na tela
          inicial para começar a acompanhar seu ritmo.
        </Text>
      ) : (
        <FlatList<RitmoRecord>
          data={records}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.bairro}</Text>
                <Text style={styles.cardDate}>{formatDate(item.createdAt)}</Text>
              </View>

              <Text style={styles.cardSubtitle}>{formatTurno(item.turno)}</Text>

              <View style={styles.row}>
                <View style={styles.badge}>
                  <Text style={styles.badgeLabel}>Energia</Text>
                  <Text style={styles.badgeValue}>{labelNivel(item.energia)}</Text>
                </View>

                <View style={styles.badge}>
                  <Text style={styles.badgeLabel}>Ambiente</Text>
                  <Text style={styles.badgeValue}>{labelNivel(item.ambiente)}</Text>
                </View>

                <View style={styles.badge}>
                  <Text style={styles.badgeLabel}>Condição</Text>
                  <Text style={styles.badgeValue}>{labelNivel(item.condicao)}</Text>
                </View>
              </View>

              {item.nota ? <Text style={styles.noteText}>“{item.nota}”</Text> : null}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060608',
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#CBD5F5',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#CBD5F5',
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    padding: 12,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F9FAFB',
  },
  cardDate: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#E5E7EB',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  badge: {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  badgeLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  badgeValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F9FAFB',
  },
  noteText: {
    marginTop: 4,
    fontSize: 13,
    fontStyle: 'italic',
    color: '#E5E7EB',
  },
});
