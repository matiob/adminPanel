import { setStorage } from "./storage.mjs";

// READ

export function addRow(table, data, storage, url) {
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

export function createCell(data) {
  const td = document.createElement("td");
  // td.innerText = `${data}`
  const tdText = document.createTextNode(data);
  td.appendChild(tdText);
  return td;
}

export function createActionButtons(id, storage, url) {
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

// DELETE

export function deleteItem(id, storage, url) {
  const data = getStorage(storage);
  if (confirm("¿seguro que desea eliminar?")) {
    const filteredData = data.filter((element) => element.id !== id);
    setStorage(storage, filteredData);
    alert("Elemento eliminado con éxito");
    window.location.href = url;
  }
}

// UPDATE

export function editItem(id, storage, url) {
  const store = storage.slice(0, -1);
  const data = getStorage(storage);
  const element = data.filter((element) => element.id === id)[0];
  setStorage(store, element);
  window.location.href = `new-${url}?edit=${true}`;
}

export function loadItem(storage) {
  const element = getStorage(storage);
  switch (storage) {
    case "order":
      loadOrder(element);
      break;
    case "product":
      loadProduct(element);
      break;
    case "provider":
      loadProvider(element);
      break;
  }
}

export function loadOrder(element) {
  document.getElementById("numInput").value = element.id;
  document.getElementById("numInput").disabled = true;
  document.getElementById("fechaEmisionInput").value = element.issue;
  document.getElementById("fechaEntregaInput").value = element.delivery;
  document.getElementById("proveedorInput").value = element.provider;
  document.getElementById("productoInput").value = element.product;
  document.getElementById("cantInput").value = element.quantity;
  document.getElementById("precioInput").value = element.price;
}

export function loadProduct(element) {
  document.getElementById("proveedorInput").value = element.provider;
  document.getElementById("SKUInput").value = element.sku;
  document.getElementById("SKUInput").disabled = true;
  document.getElementById("categoriaInput").value = element.category;
  document.getElementById("nombreProductoInput").value = element.name;
  document.getElementById("descInput").value = element.desc;
  document.getElementById("precioInput").value = element.price;
}

export function loadProvider(element) {
  document.getElementById("codigoInput").value = element.id;
  document.getElementById("codigoInput").disabled = true;
  document.getElementById("razonSocialInput").value = element.name;
  document.getElementById("categoriaInput").value = element.category;
  document.getElementById("emailInput").value = element.email;
  document.getElementById("calleInput").value = element.address;
  document.getElementById("cpInput").value = element.postalCode;
  document.getElementById("localidadInput").value = element.city;
  document.getElementById("provinciaInput").value = element.province;
  document.getElementById("paisInput").value = element.country;
  document.getElementById("ciutInput").value = element.cuit;
  document.getElementById("condicionivaInput").value = element.iva;
  document.getElementById("nombreInput").value = element.contact;
}

// CREATE

export function addItem(data, storage, url) {
  const item = createItem(storage);
  if (item) {
    const element = data.find(element => element.id === item.id || element.sku === item.sku);
    if (element) {
      const index = data.indexOf(element);
      data.splice(index, 1, item);
    } else {
      data.push(item);
    }
    setStorage(storage, data);
    alert("Creación exitosa!");
    window.location.href = url;
  }
}

export function createItem(type) {
  switch (type) {
    case "orders":
      return createOrder();
    case "products":
      return createProduct();
    case "providers":
      return createProvider();
  }
}

export function createOrder() {
  const id = document.getElementById("numInput").value;
  const issue = document.getElementById("fechaEmisionInput").value;
  const delivery = document.getElementById("fechaEntregaInput").value;
  const provider = document.getElementById("proveedorInput").value;
  const product = document.getElementById("productoInput").value;
  const quantity = document.getElementById("cantInput").value;
  const price = document.getElementById("precioInput").value;

  const item = {
    id,
    issue,
    delivery,
    provider,
    product,
    quantity,
    price,
  };

  if (!validateKeys(item)) {
    alert("Todos los campos son requeridos");
    return;
  } else {
    return item;
  }
}

export function createProduct() {
  const provider = document.getElementById("proveedorInput").value;
  const sku = document.getElementById("SKUInput").value;
  const category = document.getElementById("categoriaInput").value;
  const name = document.getElementById("nombreProductoInput").value;
  const desc = document.getElementById("descInput").value;
  const price = document.getElementById("precioInput").value;

  const item = {
    provider,
    sku,
    category,
    name,
    desc,
    price,
  };

  if (!validateKeys(item)) {
    alert("Todos los campos son requeridos");
    return;
  } else {
    return item;
  }
}

export function createProvider() {
  const id = document.getElementById("codigoInput").value;
  const name = document.getElementById("razonSocialInput").value;
  const category = document.getElementById("categoriaInput").value;
  const email = document.getElementById("emailInput").value;
  const address = document.getElementById("calleInput").value;
  const postalCode = document.getElementById("cpInput").value;
  const city = document.getElementById("localidadInput").value;
  const province = document.getElementById("provinciaInput").value;
  const country = document.getElementById("paisInput").value;
  const cuit = document.getElementById("ciutInput").value;
  const iva = document.getElementById("condicionivaInput").value;
  const contact = document.getElementById("nombreInput").value;

  const item = {
    id,
    name,
    category,
    email,
    address,
    postalCode,
    city,
    province,
    country,
    cuit,
    iva,
    contact,
  };

  if (!validateKeys(item)) {
    alert("Todos los campos son requeridos");
    return;
  } else {
    return item;
  }
}

// AUX

export function validateKeys(element) {
  for (const key in element) {
    if (!element[key]) {
      return false;
    }
  }
  return true;
}

export function fillProviderDropdown() {
  const providers = getStorage('providers');
  const select = document.getElementById('proveedorInput');
  providers.forEach(provider => {
    const option = document.createElement('option');
    option.value = provider.name;
    option.textContent = provider.name;
    select.appendChild(option);
  });
}

export function fillProductDropdown() {
  const products = getStorage('products');
  const select = document.getElementById('productoInput');
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.name;
    option.textContent = product.name;
    select.appendChild(option);
  });
}

export function fillCategoryDropdown() {
  const categories = getStorage("categories");
  const select = document.getElementById("categoriaInput");
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.name;
    option.textContent = category.name;
    select.appendChild(option);
  });
}

export function fillIVAConditionDropdown() {
  const condition = getStorage("iva");
  const select = document.getElementById("condicionivaInput");
  condition.forEach((condition) => {
    const option = document.createElement("option");
    option.value = condition.condition;
    option.textContent = condition.condition;
    select.appendChild(option);
  });
}

export function disableAddNewLink(page = 'products') {
  const providers = getStorage("providers");
  const products = getStorage("products");
  const link = document.getElementById("add-link");
  if (page === "products" && providers.length === 0) {
    link.style.color = 'gray';
    link.style.pointerEvents = 'none';
    link.innerText = "Debe existir al menos un proveedor";
    link.style.cursor = 'not-allowed';
    link.setAttribute('href', '#');
  } else if (page === 'orders' && products.length === 0) {
    link.style.color = 'gray';
    link.style.pointerEvents = 'none';
    link.innerText = "Debe existir un proveedor con un producto";
    link.style.cursor = 'not-allowed';
    link.setAttribute('href', '#');
  } else {
    link.style.color = '';
    link.style.pointerEvents = '';
    link.style.cursor = '';
    if (page === 'products') {
      link.innerText = "Nuevo Producto";
      link.setAttribute('href', 'new-products.html')
    } else {
      link.innerText = "Nueva Orden de Compra";
      link.setAttribute('href', 'new-orders.html')
    }
  }
}