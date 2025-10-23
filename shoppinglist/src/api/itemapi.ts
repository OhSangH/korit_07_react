import axios from 'axios';
import { Item, ItemResponse } from '../types';

export const getItems = async (): Promise<ItemResponse[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/items`);
  return response.data._embedded.items;
};

export const addItem = async (item: Item): Promise<ItemResponse> => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/items`, item, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
