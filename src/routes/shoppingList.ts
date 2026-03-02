import { IncomingMessage, ServerResponse } from 'http';
import { getItems, getItemById, addItem } from '../controllers/shopppingList.js';

// Handles requests to /shopping-list endpoints
export const shoppingListRoute = async (req: IncomingMessage, res: ServerResponse) => {
  // Check if request URL starts with /shopping-list
  if (req.url?.startsWith("/shopping-list")) {
    // Split the URL to extract potential ID
    const parts = req.url.split("/");
    const id = parts[2] ? parseInt(parts[2]) : undefined;

    // GET /shopping-list → return all items
    if (req.method === "GET" && !id) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(getItems()));
      return;
    }

    // GET /shopping-list/:id → return specific item by ID
    if (req.method === "GET" && id) {
      const item = getItemById(id);
      // If item exists, return 200, else 404
      res.writeHead(item ? 200 : 404, { "Content-Type": "application/json" });
      res.end(JSON.stringify(item || { message: "Item not found" }));
      return;
    }

    // POST /shopping-list → add a new item
    if (req.method === "POST") {
      let body = "";

      // Collect request body chunks
      req.on("data", chunk => {
        body += chunk.toString();
      });

      // When body is fully received
      req.on("end", () => {
        try {
          // Parse body and create new item
          const { name, quantity } = JSON.parse(body);
          const newItem = addItem(name, quantity);

          // Return created item with 201 status
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newItem));
        } catch (error) {
          // Handle invalid JSON or missing fields
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Invalid request body" }));
          console.log(error); // Log error for debugging
        }
      });
      return;
    }

    // If method is not GET or POST, respond with 405
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Method not allowed" }));
  }
};