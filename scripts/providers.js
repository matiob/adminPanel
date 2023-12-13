const categories = [
  {
      name: "Limpieza"
  },
  {
      name: "Electrónica"
  },
  {
      name: "Hogar"
  },
  {
      name: "Jardín"
  },
  {
      name: "Comestibles"
  },
]
const ivaCondition = [
  {
    condition: 'R.I.'
  },
  {
    condition: 'Exento'
  },
  {
    condition: 'Monotributista'
  }
]

window.addEventListener("DOMContentLoaded", () => {

    //            set static data               //
    setStorage('categories', categories);
    setStorage('iva', ivaCondition);
    // ------------------------------------- //


  const table = document.getElementById("provider-list");
  const providers = getStorage("providers");
  const storage = "providers";
  const url = "providers.html";
  addRow(table, providers, storage, url);
});
function getStorage(key = "") {
  const storage = JSON.parse(window.localStorage.getItem(key)) || [];
  return storage;
}
function setStorage(key, array = []) {
  const storage = JSON.stringify(array);
  window.localStorage.setItem(key, storage);
}
function addRow(table, data, storage, url) {
  for (let i = 0; i < data.length; i++) {
    const tr = document.createElement("tr");

    for (const key in data[i]) {
      const td = createCell(data[i][key]);
      tr.appendChild(td);
    }

    const buttons = createActionButtons(data[i].id, storage, url);
    tr.appendChild(buttons);

    table.appendChild(tr);
  }
}

function createCell(data) {
  const td = document.createElement("td");
  // td.innerText = `${data}`
  const tdText = document.createTextNode(data);
  td.appendChild(tdText);
  return td;
}

function createActionButtons(id, storage, url) {
  const buttons = document.createElement("td");

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.innerText = "Editar";
  editBtn.classList.add("editBtn", "btn", "btn-outline-warning", "btn-sm");
  editBtn.addEventListener("click", () => editItem(id, storage, url));
  buttons.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.innerText = "Eliminar";
  deleteBtn.classList.add("deleteBtn", "btn", "btn-outline-danger", "btn-sm");
  deleteBtn.addEventListener("click", () => deleteItem(id, storage, url));
  buttons.appendChild(deleteBtn);

  buttons.style.display = "flex";
  buttons.style.justifyContent = "center";
  buttons.style.gap = "1vw";

  return buttons;
}

function deleteItem(id, storage, url) {
  const data = getStorage(storage);
  if (confirm("¿seguro que desea eliminar?")) {
    const filteredData = data.filter((element) => element.id !== id);
    setStorage(storage, filteredData);
    alert("Elemento eliminado con éxito");
    window.location.href = url;
  }
}

function editItem(id, storage, url) {
  const store = storage.slice(0, -1);
  const data = getStorage(storage);
  const element = data.filter((element) => element.id === id)[0];
  setStorage(store, element);
  window.location.href = `new-${url}?edit=${true}`;
}
