"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItem = exports.getItemById = exports.getItems = void 0;
const items = [];
let currentId = 1;
const getItems = () => items;
exports.getItems = getItems;
const getItemById = (id) => {
    return items.find(item => item.id === id);
};
exports.getItemById = getItemById;
const addItem = (name, quantity) => {
    const newItem = {
        id: currentId++,
        name,
        quantity,
        bought: false
    };
    items.push(newItem);
    return newItem;
};
exports.addItem = addItem;
