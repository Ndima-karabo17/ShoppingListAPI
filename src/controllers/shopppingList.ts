import { type ShoppingItem } from "../types/shoppingItem.js";

// In-memory array to store all shopping items.
// Data will be lost when the server restarts.
const items: ShoppingItem[] = [];

// Counter used to generate unique IDs for shopping items
let currentId = 1;

// Returns all shopping items
export const getItems = (): ShoppingItem[] => {
  return items;
};

// Finds a shopping item by its ID
// Returns undefined if the item does not exist
export const getItemById = (id: number): ShoppingItem | undefined => {
  return items.find(item => item.id === id);
};

// Adds a new item to the shopping list
// Sets bought to false by default
export const addItem = (name: string, quantity: number): ShoppingItem => {
  const newItem: ShoppingItem = {
    id: currentId++, // Auto-increment ID
    name,            // Item name
    quantity,        // Item quantity
    bought: false    // Item has not been bought yet
  };

  // Store the new item in the list
  items.push(newItem);

  // Return the new created item
  return newItem;
};