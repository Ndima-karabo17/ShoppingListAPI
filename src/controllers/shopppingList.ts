import { type ShoppingItem } from "../types/shoppingItem.js"; 

const items: ShoppingItem[] = [];
let currentId = 1;

export const getItems = (): ShoppingItem[] => items;

export const getItemById = (id: number): ShoppingItem | undefined => {
  return items.find(item => item.id === id);
};

export const addItem = (name: string, quantity: number): ShoppingItem => {
  const newItem: ShoppingItem = {
    id: currentId++,
    name,
    quantity,
    bought: false
  };
  items.push(newItem);
  return newItem;
};

