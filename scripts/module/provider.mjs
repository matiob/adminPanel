import { getStorage } from "../utils/storage.mjs";
import { addItem, fillCategoryDropdown, fillIVAConditionDropdown } from "../utils/utils.mjs";

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const isEdit = params.get("edit");

  const providers = getStorage("providers");
  const storage = "providers";
  const url = "providers.html";

  fillCategoryDropdown();
  fillIVAConditionDropdown();

  isEdit && loadItem("provider");
  
  const submit = document.getElementById("button-submit");
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    addItem(providers, storage, url);
  });
});
