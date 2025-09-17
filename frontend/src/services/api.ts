// src/services/api.ts
import axios from 'axios';

// Define a interface para o Produto, para termos tipagem forte
export interface Product {
  id: number;
  name: string;
  price: number;
  user?: { id: number; email: string }; // O usuário pode ser opcional
}

// Cria uma instância do Axios com a URL base da nossa API
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});

// Isso é um Interceptor: uma função que é executada ANTES de cada requisição.
// Aqui, estamos pegando o token do localStorage e o adicionando ao cabeçalho Authorization.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;