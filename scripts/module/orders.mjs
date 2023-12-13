import { getStorage } from "../utils/storage.mjs";
import { addRow } from '../utils/utils.mjs';

window.addEventListener('DOMContentLoaded', () => {
    const table = window.document.getElementById("orders-list");
    const orders = getStorage("orders");
    const storage = 'orders';
    const url = 'orders.html'
    addRow(table, orders, storage, url)
});

