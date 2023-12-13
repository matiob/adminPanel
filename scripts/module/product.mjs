import { getStorage } from "../utils/storage.mjs";
import { addItem, fillProviderDropdown, fillCategoryDropdown } from "../utils/utils.mjs";

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const isEdit = params.get("edit");

  const products = getStorage("products");
  const storage = "products";
  const url = "products.html";

  fillProviderDropdown();
  fillCategoryDropdown();

  isEdit && loadItem("product");
  
  const submit = document.getElementById("button-submit");
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    addItem(products, storage, url);
  });
});
