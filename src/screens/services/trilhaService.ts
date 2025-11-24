import { api } from './api';

export interface TrilhaSummary {
  id: string;
  titulo: string;
  descricao: string;
}

export interface Trilha extends TrilhaSummary {}

export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface TrilhaRequest {
  titulo: string;
  descricao: string;
}

export const trilhaService = {
  async getPage(page = 1, pageSize = 10): Promise<PaginatedResult<TrilhaSummary>> {
    const { data } = await api.get<PaginatedResult<TrilhaSummary>>('/Trilha/paged', {
      params: { page, pageSize },
    });
    return data;
  },

  async getById(id: string): Promise<Trilha> {
    const { data } = await api.get<Trilha>(`/Trilha/${id}`);
    return data;
  },

  async create(payload: TrilhaRequest): Promise<Trilha> {
    const { data } = await api.post<Trilha>('/Trilha', payload);
    return data;
  },

  async update(id: string, payload: TrilhaRequest): Promise<void> {
    await api.put(`/Trilha/${id}`, payload);
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/Trilha/${id}`);
  },
};
