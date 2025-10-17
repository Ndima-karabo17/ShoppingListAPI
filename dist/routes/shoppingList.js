"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoppingListRoute = void 0;
const shopppingList_js_1 = require("../controllers/shopppingList.js");
const shoppingListRoute = async (req, res) => {
    if (req.url?.startsWith("/shopping-list")) {
        const parts = req.url.split("/");
        const id = parts[2] ? parseInt(parts[2]) : undefined;
        if (req.method === "GET" && !id) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify((0, shopppingList_js_1.getItems)()));
            return;
        }
        if (req.method === "GET" && id) {
            const item = (0, shopppingList_js_1.getItemById)(id);
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
                    const newItem = (0, shopppingList_js_1.addItem)(name, quantity);
                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(newItem));
                }
                catch (error) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Invalid request body" }));
                    console.log(error);
                }
            });
            return;
        }
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Method not allowed" }));
    }
};
exports.shoppingListRoute = shoppingListRoute;
