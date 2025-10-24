import { ItemEntity } from './../types';
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

export const deleteItem = async (link: string): Promise<ItemResponse> => {
  const response = await axios.delete(link, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateItem = async (itemEntity: ItemEntity): Promise<ItemResponse> => {
  const response = await axios.put(itemEntity.url, itemEntity.item, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
