import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { trilhaService, TrilhaSummary } from '../services/trilhaService';

export default function TrilhaListScreen() {
  const [trilhas, setTrilhas] = useState<TrilhaSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const loadTrilhas = async () => {
    try {
      setLoading(true);
      const res = await trilhaService.getPage(1, 20);
      setTrilhas(res.items);
    } catch (error: any) {
      console.log(error?.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível carregar as trilhas de estudo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrilhas();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitulo('');
    setDescricao('');
  };

  const handleEdit = (trilha: TrilhaSummary) => {
    setEditingId(trilha.id);
    setTitulo(trilha.titulo);
    setDescricao(trilha.descricao);
  };

  const handleSave = async () => {
    if (!titulo || !descricao) {
      Alert.alert('Atenção', 'Preencha título e descrição.');
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await trilhaService.update(editingId, { titulo, descricao });
      } else {
        await trilhaService.create({ titulo, descricao });
      }
      resetForm();
      await loadTrilhas();
    } catch (error: any) {
      console.log(error?.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível salvar a trilha.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Confirmar', 'Deseja realmente excluir esta trilha?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await trilhaService.remove(id);
            await loadTrilhas();
          } catch {
            Alert.alert('Erro', 'Não foi possível excluir a trilha.');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#FFF" />
        <Text style={{ color: '#FFF', marginTop: 8 }}>Carregando trilhas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trilhas de estudo</Text>
      <Text style={styles.subtitle}>
        Use estas trilhas para organizar o estudo a partir do seu bem-estar diário.
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>{editingId ? 'Editar trilha' : 'Nova trilha'}</Text>

        <TextInput
          style={styles.input}
          placeholder="Título da trilha"
          placeholderTextColor="#888"
          value={titulo}
          onChangeText={setTitulo}
        />

        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Descrição da trilha"
          placeholderTextColor="#888"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <TouchableOpacity
          style={[styles.button, saving && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>
              {editingId ? 'Salvar alterações' : 'Criar trilha'}
            </Text>
          )}
        </TouchableOpacity>

        {editingId && (
          <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
            <Text style={styles.cancelButtonText}>Cancelar edição</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={trilhas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardDesc}>{item.descricao}</Text>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.link}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={[styles.link, { color: '#FF5555' }]}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: '#FFF', marginTop: 16 }}>
            Nenhuma trilha cadastrada ainda.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, backgroundColor: '#060608', justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#060608', padding: 16, paddingTop: 60 },
  title: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { color: '#E5E7EB', fontSize: 13, marginBottom: 16 },
  form: { marginBottom: 16 },
  label: { color: '#FFF', marginBottom: 6, fontWeight: '600' },
  input: {
    backgroundColor: '#111',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFF',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#FF005C',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  cancelButton: { marginTop: 8, alignItems: 'center' },
  cancelButtonText: { color: '#00FFC2' },
  card: { backgroundColor: '#111', borderRadius: 8, padding: 12, marginBottom: 10 },
  cardTitle: { color: '#FFF', fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardDesc: { color: '#DDD', fontSize: 13 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8, gap: 16 },
  link: { color: '#00FFC2', fontWeight: '500' },
});
