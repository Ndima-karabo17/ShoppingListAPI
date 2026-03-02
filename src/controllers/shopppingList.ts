import { type ShoppingItem } from "../types/shoppingItem.js";

// In-memory array to store all shopping items
const items: ShoppingItem[] = [];

// Counter to generate unique IDs for shopping items
let currentId = 1;

// Returns all shopping items
export const getItems = (): ShoppingItem[] => items;

// Returns a single item by ID
export const getItemById = (id: number): ShoppingItem | undefined =>
  items.find(item => item.id === id);

// Adds a new shopping item
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

// Updates an existing shopping item by ID
export const updateItem = (id: number, data: Partial<Omit<ShoppingItem, 'id'>>): ShoppingItem | undefined => {
  const item = getItemById(id);
  if (!item) return undefined;

  // Update only the provided fields
  if (data.name !== undefined) item.name = data.name;
  if (data.quantity !== undefined) item.quantity = data.quantity;
  if (data.bought !== undefined) item.bought = data.bought;

  return item;
};

// Deletes an item by ID
export const deleteItem = (id: number): boolean => {
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return false;

  items.splice(index, 1);
  return true;
};