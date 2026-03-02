import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const shoppingList: { id: number; name: string; quantity: number }[] = [];
let nextId = 1;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'POST' && url === '/shopping-list') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const { name, quantity } = JSON.parse(body);
      const newItem = { id: nextId++, name, quantity };
      shoppingList.push(newItem);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newItem));
    });

  } else if (method === 'GET' && url === '/shopping-list') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(shoppingList));

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = Number(process.env.PORT) || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});