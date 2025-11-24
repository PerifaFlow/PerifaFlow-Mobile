// src/screens/app/TrilhaFormScreen.tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { trilhaService } from '../services/trilhaService';

interface Props {
  trilhaId?: string;
}

export default function TrilhaFormScreen({ trilhaId }: Props) {
  const isEdit = !!trilhaId;

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit && trilhaId) {
      (async () => {
        try {
          const trilha = await trilhaService.getById(trilhaId);
          setTitulo(trilha.titulo);
          setDescricao(trilha.descricao);
        } catch (err: any) {
          console.log(err?.response?.data || err.message);
          Alert.alert('Erro', 'Não foi possível carregar a trilha.');
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [isEdit, trilhaId]);

  const handleSave = async () => {
    if (!titulo || !descricao) {
      Alert.alert('Atenção', 'Preencha título e descrição.');
      return;
    }

    setSaving(true);
    try {
      if (isEdit && trilhaId) {
        await trilhaService.update(trilhaId, { titulo, descricao });
      } else {
        await trilhaService.create({ titulo, descricao });
      }
      Alert.alert('Sucesso', 'Trilha salva com sucesso.');
    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      Alert.alert('Erro', 'Não foi possível salvar a trilha.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#FFF" />
        <Text style={{ color: '#FFF', marginTop: 8 }}>Carregando trilha...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEdit ? 'Editar trilha' : 'Nova trilha'}</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Nome da trilha"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={descricao}
        onChangeText={setDescricao}
        multiline
        placeholder="Explique o objetivo dessa trilha para o aluno."
        placeholderTextColor="#888"
      />

      <TouchableOpacity
        style={[styles.button, saving && { opacity: 0.7 }]}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>{isEdit ? 'Salvar alterações' : 'Criar trilha'}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, backgroundColor: '#060608', justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#060608', padding: 16, paddingTop: 60 },
  title: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  label: { color: '#FFF', marginBottom: 4 },
  input: {
    backgroundColor: '#111',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFF',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#FF005C',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});
