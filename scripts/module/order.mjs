import { getStorage } from "../utils/storage.mjs";
import { addItem, loadItem, fillProductDropdown, fillProviderDropdown } from "../utils/utils.mjs";

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const isEdit = params.get("edit");
  console.log(typeof isEdit, isEdit);
  const orders = getStorage("orders");
  const storage = "orders";
  const url = "orders.html";

  fillProviderDropdown();
  fillProductDropdown();

  isEdit && loadItem('order');

  const submit = document.getElementById('button-submit');
  submit.addEventListener('click', (event) => {
    event.preventDefault();
    addItem(orders, storage, url);
  })
});
