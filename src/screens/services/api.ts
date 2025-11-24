import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://perifaflow-dotnet-4.onrender.com/api/v1',
  timeout: 15000,
});

export const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};
