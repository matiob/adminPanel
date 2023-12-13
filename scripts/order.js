window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const isEdit = params.get("edit");
  console.log(typeof isEdit, isEdit);
  const orders = getStorage("orders");
  const storage = "orders";
  const url = "orders.html";

  fillProviderDropdown();
  fillProductDropdown();

  isEdit && loadItem("order");

  const submit = document.getElementById("button-submit");
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    addItem(orders, storage, url);
  });
});

function getStorage(key = "") {
  const storage = JSON.parse(window.localStorage.getItem(key)) || [];
  return storage;
}

function setStorage(key, array = []) {
  const storage = JSON.stringify(array);
  window.localStorage.setItem(key, storage);
}

function loadItem(storage) {
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

function loadOrder(element) {
  document.getElementById("numInput").value = element.id;
  document.getElementById("numInput").disabled = true;
  document.getElementById("fechaEmisionInput").value = element.issue;
  document.getElementById("fechaEntregaInput").value = element.delivery;
  document.getElementById("proveedorInput").value = element.provider;
  document.getElementById("productoInput").value = element.product;
  document.getElementById("cantInput").value = element.quantity;
  document.getElementById("precioInput").value = element.price;
}

function loadProduct(element) {
  document.getElementById("proveedorInput").value = element.provider;
  document.getElementById("SKUInput").value = element.sku;
  document.getElementById("SKUInput").disabled = true;
  document.getElementById("categoriaInput").value = element.category;
  document.getElementById("nombreProductoInput").value = element.name;
  document.getElementById("descInput").value = element.desc;
  document.getElementById("precioInput").value = element.price;
}

function loadProvider(element) {
  document.getElementById("codigoInput").value = element.id;
  document.getElementById("codigoInput").disabled = true;
  document.getElementById("razonSocialInput").value = element.name;
  document.getElementById("rubroInput").value = element.category;
  document.getElementById("emailInput").value = element.email;
  document.getElementById("calleInput").value = element.address;
  document.getElementById("cpInput").value = element.postalCode;
  document.getElementById("localidadInput").value = element.city;
  document.getElementById("provinciaInput").value = element.province;
  document.getElementById("paisInput").value = element.country;
  document.getElementById("ciutInput").value = element.cuit;
  document.getElementById("condicionivaInput").value = element.iva;
  document.getElementById("nombreInput").value = contact;
}

function addItem(data, storage, url) {
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

function createItem(type) {
  switch (type) {
    case "orders":
      return createOrder();
    case "products":
      return createProduct();
    case "providers":
      return createProvider();
  }
}

function createOrder() {
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

function createProduct() {
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

function createProvider() {
  const id = document.getElementById("codigoInput").value;
  const name = document.getElementById("razonSocialInput").value;
  const category = document.getElementById("rubroInput").value;
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

function validateKeys(element) {
  for (const key in element) {
    if (!element[key]) {
      return false;
    }
  }
  return true;
}

function fillProviderDropdown() {
  const providers = getStorage("providers");
  const select = document.getElementById("proveedorInput");
  providers.forEach((provider) => {
    const option = document.createElement("option");
    option.value = provider.name;
    option.textContent = provider.name;
    select.appendChild(option);
  });
}

function fillProductDropdown() {
  const products = getStorage("products");
  const select = document.getElementById("productoInput");
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name;
    select.appendChild(option);
  });
}
