// Represents a single item in the shopping list
export type ShoppingItem = {
  id: number;       // Unique identifier for the item
  name: string;     // Name of the shopping item
  quantity: number; // Quantity of the item
  bought: boolean;  // Whether the item has been purchased
};