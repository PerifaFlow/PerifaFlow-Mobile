import { useRecords } from '@/src/screens/context/RecordsContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type RitmoRecordInput = {
  bairro: string;
  turno: 'MANHA' | 'TARDE' | 'NOITE' | string;
  energia: number;   // 0..2
  ambiente: number;  // 0..2
  condicao: number;  // 0..2
  nota?: string | null;
};

export default function NewRecordScreen() {
  const router = useRouter();
  const { addRecord } = useRecords() as {
    addRecord: (record: RitmoRecordInput & { createdAt: string }) => void;
  };

  const [bairro, setBairro] = useState('');
  const [turno, setTurno] = useState<'MANHA' | 'TARDE' | 'NOITE' | ''>('');
  const [energia, setEnergia] = useState<number | null>(null);
  const [ambiente, setAmbiente] = useState<number | null>(null);
  const [condicao, setCondicao] = useState<number | null>(null);
  const [nota, setNota] = useState('');

  function handleSelectTurno(value: 'MANHA' | 'TARDE' | 'NOITE') {
    setTurno(value);
  }

  function handleNivel(setter: (v: number) => void, valor: number) {
    setter(valor);
  }

  function labelNivel(valor: number | null) {
    if (valor === null) return 'Selecione';
    if (valor === 0) return 'Baixo';
    if (valor === 1) return 'Médio';
    return 'Alto';
  }

  const canSave =
    bairro.trim() &&
    turno &&
    energia !== null &&
    ambiente !== null &&
    condicao !== null;

  const handleSave = () => {
    if (!canSave) {
      Alert.alert(
        'Faltam informações',
        'Preencha bairro, turno e os níveis de energia, ambiente e condição.'
      );
      return;
    }

    const payload: RitmoRecordInput & { createdAt: string } = {
      bairro: bairro.trim(),
      turno,
      energia: energia as number,
      ambiente: ambiente as number,
      condicao: condicao as number,
      nota: nota.trim() || null,
      createdAt: new Date().toISOString(),
    };

    try {
      addRecord(payload);
      Alert.alert(
        'Registro salvo',
        'Seu bem-estar de hoje foi registrado. Agora você pode acompanhar no histórico e ver como isso impacta suas trilhas.',
        [
          {
            text: 'Ver histórico',
            onPress: () => router.replace('/(tabs)/explore'),
          },
          {
            text: 'Voltar para início',
            style: 'cancel',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } catch (e) {
      console.log(e);
      Alert.alert(
        'Erro',
        'Não foi possível salvar o registro de bem-estar. Tente novamente.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo registro de bem-estar</Text>
      <Text style={styles.subtitle}>
        Conte pra gente como está seu corpo, sua mente e a quebrada antes de começar a estudar.
      </Text>

      <Text style={styles.label}>Bairro / região</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Capão Redondo"
        placeholderTextColor="#888"
        value={bairro}
        onChangeText={setBairro}
      />

      <Text style={styles.label}>Turno</Text>
      <View style={styles.row}>
        {(['MANHA', 'TARDE', 'NOITE'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[
              styles.chip,
              turno === t && styles.chipSelected,
            ]}
            onPress={() => handleSelectTurno(t)}
          >
            <Text
              style={[
                styles.chipText,
                turno === t && styles.chipTextSelected,
              ]}
            >
              {t === 'MANHA' ? 'Manhã' : t === 'TARDE' ? 'Tarde' : 'Noite'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Nível de energia</Text>
      <View style={styles.row}>
        {[0, 1, 2].map((v) => (
          <TouchableOpacity
            key={`energia-${v}`}
            style={[
              styles.chip,
              energia === v && styles.chipSelected,
            ]}
            onPress={() => handleNivel((val) => setEnergia(val), v)}
          >
            <Text
              style={[
                styles.chipText,
                energia === v && styles.chipTextSelected,
              ]}
            >
              {labelNivel(v)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Ambiente para estudar</Text>
      <View style={styles.row}>
        {[0, 1, 2].map((v) => (
          <TouchableOpacity
            key={`ambiente-${v}`}
            style={[
              styles.chip,
              ambiente === v && styles.chipSelected,
            ]}
            onPress={() => handleNivel((val) => setAmbiente(val), v)}
          >
            <Text
              style={[
                styles.chipText,
                ambiente === v && styles.chipTextSelected,
              ]}
            >
              {labelNivel(v)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Condição geral (corpo + mente)</Text>
      <View style={styles.row}>
        {[0, 1, 2].map((v) => (
          <TouchableOpacity
            key={`condicao-${v}`}
            style={[
              styles.chip,
              condicao === v && styles.chipSelected,
            ]}
            onPress={() => handleNivel((val) => setCondicao(val), v)}
          >
            <Text
              style={[
                styles.chipText,
                condicao === v && styles.chipTextSelected,
              ]}
            >
              {labelNivel(v)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Quer deixar um recado?</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        placeholder="Ex: Muito barulho em casa hoje, difícil focar."
        placeholderTextColor="#888"
        value={nota}
        onChangeText={setNota}
      />

      <TouchableOpacity
        style={[styles.button, !canSave && { opacity: 0.6 }]}
        onPress={handleSave}
        disabled={!canSave}
      >
        <Text style={styles.buttonText}>Salvar registro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#060608', padding: 16, paddingTop: 60 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  subtitle: { fontSize: 13, color: '#E5E7EB', marginBottom: 16 },
  label: { color: '#FFF', marginTop: 8, marginBottom: 4, fontSize: 13 },
  input: {
    backgroundColor: '#111',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFF',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  chip: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#374151',
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: '#FF005C',
    borderColor: '#FF005C',
  },
  chipText: { color: '#E5E7EB', fontSize: 12 },
  chipTextSelected: { color: '#FFF', fontWeight: '600' },
  button: {
    marginTop: 16,
    backgroundColor: '#FF005C',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});
