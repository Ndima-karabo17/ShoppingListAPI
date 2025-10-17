import  { IncomingMessage, ServerResponse } from 'http'
import { getItems, getItemById, addItem } from '../controllers/shopppingList.js'
export const shoppingListRoute = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/shopping-list")) {
    const parts = req.url.split("/");
    const id = parts[2] ? parseInt(parts[2]) : undefined;

    if (req.method === "GET" && !id) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(getItems()));
      return;
    }

    if (req.method === "GET" && id) {
      const item = getItemById(id);
      res.writeHead(item ? 200 : 404, { "Content-Type": "application/json" });
      res.end(JSON.stringify(item || { message: "Item not found" }));
      return;
    }

    if (req.method === "POST") {
      let body = "";

      req.on("data", chunk => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const { name, quantity } = JSON.parse(body);
          const newItem = addItem(name, quantity);
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newItem));
        } catch (error) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Invalid request body" }));
        console.log(error)
        }
      });
      return;
    }

    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Method not allowed" }));
  }
};

