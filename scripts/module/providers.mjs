import { getStorage } from "../utils/storage.mjs";
import { addRow } from "../utils/utils.mjs";

window.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("provider-list");
  const providers = getStorage("providers");
  const storage = "providers";
  const url = "providers.html";
  addRow(table, providers, storage, url);
});

function ivaCondition(num) {
  let condition = "";
  switch (num) {
    case "1":
      condition = "IVA Responsable Inscripto";
      break;
    case "2":
      condition = "IVA Responsable no Inscripto";
      break;
    case "3":
      condition = "IVA no Responsable";
      break;
    case "4":
      condition = "IVA Sujeto Exento";
      break;
    case "5":
      condition = "Responsable Monotributo";
      break;
    case "6":
      condition = "Sujeto no Categorizado";
      break;
    case "7":
      condition = "Proveedor del Exterior";
      break;
  }
  return condition;
}
