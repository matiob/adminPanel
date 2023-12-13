import { getStorage } from "../utils/storage.mjs";
import { addRow } from "../utils/utils.mjs";

window.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("product-list");
  const products = getStorage("products");
  const storage = "products";
  const url = "products.html";
  addRow(table, products, storage, url);
});
