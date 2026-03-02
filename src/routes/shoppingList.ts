import { IncomingMessage, ServerResponse } from 'http';
import { getItems, getItemById, addItem, updateItem, deleteItem } from '../controllers/shopppingList.js';

// Handles requests to /shopping-list endpoints
export const shoppingListRoute = async (req: IncomingMessage, res: ServerResponse) => {
  if (!req.url?.startsWith("/shopping-list")) return;

  const parts = req.url.split("/");
  const id = parts[2] ? parseInt(parts[2]) : undefined;

  // GET /shopping-list → get all items
  if (req.method === "GET" && !id) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(getItems()));
    return;
  }

  // GET /shopping-list/:id → get item by id
  if (req.method === "GET" && id) {
    const item = getItemById(id);
    res.writeHead(item ? 200 : 404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(item || { message: "Item not found" }));
    return;
  }

  // POST /shopping-list → add new item
  if (req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk.toString(); });
    req.on("end", () => {
      try {
        const { name, quantity } = JSON.parse(body);
        const newItem = addItem(name, quantity);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newItem));
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid request body" }));
        console.log(error);
      }
    });
    return;
  }

  // PUT /shopping-list/:id → update item
  if (req.method === "PUT" && id) {
    let body = "";
    req.on("data", chunk => { body += chunk.toString(); });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const updated = updateItem(id, data);
        res.writeHead(updated ? 200 : 404, { "Content-Type": "application/json" });
        res.end(JSON.stringify(updated || { message: "Item not found" }));
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid request body" }));
        console.log(error);
      }
    });
    return;
  }

  // DELETE /shopping-list/:id → delete item
  if (req.method === "DELETE" && id) {
    const deleted = deleteItem(id);
    res.writeHead(deleted ? 200 : 404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(deleted ? { message: "Item deleted" } : { message: "Item not found" }));
    return;
  }

  // If method not allowed
  res.writeHead(405, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Method not allowed" }));
};