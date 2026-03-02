# Shopping List API


The api is a RESTful service that allows users to manage their shopping items.
Users can add, view, update, and delete items from their shopping list, making
it easy to keep track of groceries and other shopping needs.


## Features

- Add a new shopping item
- Retrieve all items
- Retrieve a single item by ID
- Update an item (name, quantity, purchased status)
- Delete an item
- Input validation and error handling
- Consistent JSON responses

 ## Technology Stack

- **Node.js**
- **TypeScript**
- HTTP Server (built with native Node.js HTTP module)
- In-memory storage (array)

  ## Install dependencies
  
- npm install
- npm install typescript ts-node @types/node --save-dev
  
npx tsc --init

npx tsc

npx ts-node src/server.ts

npm run build

npm start

npm run dev


## API Endpoints

- Base URL http://localhost:3000

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| GET    | /shopping-list     | Get all shopping items  |
| GET    | /shopping-list/:id | Get a single item by ID |
| POST   | /shopping-list     | Add a new item          |
| PUT    | /shopping-list/:id | Update an existing item |
| DELETE | /shopping-list/:id | Delete an item by ID    |

Example Requests
-

- Get all items: http://localhost:3000/shoping-list
- Get single item: http://localhost:3000/shoping-list/1
- post new item:  curl -X POST http://localhost:3000/shopping-list \
  -H "Content-Type: application/json" \
  -d '{"name":"Apples","quantity":5}'

- put update item: curl -X PUT http://localhost:3000/shopping-list/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Green Apples","quantity":10,"bought":true}'

- Delete item:  curl -X DELETE http://localhost:3000/shopping-list/1