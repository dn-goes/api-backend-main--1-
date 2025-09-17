import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import type { Product } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    apiClient.get('/products')
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        }
      })
      .catch(error => console.error("Falha ao buscar produtos:", error));
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.post<Product>('/products', { name, price: parseFloat(price) });
      setProducts([...products, response.data]);
      setName('');
      setPrice('');
    } catch (error) {
      alert("Não foi possível criar o produto.");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await apiClient.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      alert("Não foi possível deletar o produto. Você tem permissão de Admin?");
    }
  };

  return (
    <div>
      <button onClick={logout} style={{ float: 'right' }}>Sair</button>
      <h2>Meus Produtos</h2>
      <form onSubmit={handleCreateProduct}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome do produto" required />
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Preço" step="0.01" required />
        <button type="submit">Adicionar Produto</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - R$ {product.price} (Criado por: {product.user?.email || 'Desconhecido'})
            <button onClick={() => handleDeleteProduct(product.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};