// Stock
const stock = document.getElementById('stock-body');
// Add Products
const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const inputQtd = document.getElementById('quantity');
const addButton = document.getElementById('add-button');

// -------------------------------------------------

const stockProducts = [];
const product = {};

const renderProducts = (arr) => {
  stock.innerHTML = '';
  arr.forEach(item => {
    const tr = document.createElement('tr');
    for(let value in item) {
      const td = document.createElement('td');
      td.textContent = item[value];
      tr.appendChild(td);
    }
    stock.appendChild(tr);
  });
};

const isAddingProduct = e => {
  const { id, value } = e.target;
  Object.assign(product, {[id]: value});
};
const inputs = [inputName, inputPrice, inputQtd];
inputs.forEach(item => {
  item.addEventListener('change', isAddingProduct);
});

const handleAddProduct = e => {
  e.preventDefault();
  let newProduct = {...product};
  stockProducts.push(newProduct);
  renderProducts(stockProducts);
};

addButton.addEventListener('click', handleAddProduct);