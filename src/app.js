// Stock
const stock = document.getElementById('stock-body');
// Add Products
const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const inputQtd = document.getElementById('quantity');
const addButton = document.getElementById('add-button');
// Sell Products
const inputSellName = document.getElementById('nameSell');
const inputSellQtd = document.getElementById('quantitySell');
const sellButton = document.getElementById('sell-button');
// -------------------------------------------------

const stockProducts = [];
const product = {};

// Render Products
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

// Adding Products
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

  inputs.forEach(item => item.value = '');
}; 
addButton.addEventListener('click', handleAddProduct);

// Selling Products
const soldProduct = {};

const sellProduct = (product) => {
  for (let i = 0; i < stockProducts.length; i++) {
    let stockQuantity = Number(stockProducts[i].quantity);
    let soldQuantity = Number(product.quantitySell);

    if(product.nameSell === stockProducts[i].name){
      if(soldQuantity > stockQuantity ) {
        console.log('Não há estoque suficiente!');
        break;
      }
      const soldQuantityValue = stockQuantity - soldQuantity;
      stockProducts[i].quantity = soldQuantityValue;
      stockProducts[i].quantity === 0 && delete stockProducts[i];
      break;
    }
  }
  renderProducts(stockProducts);
};

const isSellingProduct = (e) => {
  const { id, value } = e.target;
  Object.assign(soldProduct, {[id]: value});
};

const sellingInputs = [inputSellName, inputSellQtd];
sellingInputs.forEach(item => {
  item.addEventListener('change', isSellingProduct);
});

const handleSellProduct = e => {
  e.preventDefault();
  let newSoldProduct = {...soldProduct};
  sellProduct(newSoldProduct);
  sellingInputs.forEach(item => item.value = '');
};
sellButton.addEventListener('click', handleSellProduct);