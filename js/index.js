// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');

  const price = product.querySelector('.price span');
  const quantity = product.querySelector('.quantity input');
  const subtotal = product.querySelector('.subtotal span')
  console.log(price);

  const totalProduct = price.innerHTML * quantity.value;

  subtotal.innerText = totalProduct;

  return totalProduct;
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  // const singleProduct = document.querySelector('.product');
  // updateSubtotal(singleProduct);
  // end of test

  // ITERATION 2
  const allProducts = [...document.querySelectorAll('.product')];

  let total = 0;
  for (let i = 0; i < allProducts.length; i++) {
    updateSubtotal(allProducts[i]);
    total += updateSubtotal(allProducts[i]);
    
  }
  


  // ITERATION 3
  const totalValue = document.querySelector('#total-value span');
  

  totalValue.innerText = total;

  return total;
}


// ITERATION 4

function removeProduct(event) {

  const target = event.currentTarget;
  console.log('The target in remove is:', target);
  target.parentElement.parentElement.remove();
  calculateAll() -= updateSubtotal(target);
  
}

// ITERATION 5

function createProduct() {

  const createRow = document.querySelector('.create-product');
  let newProdNameInput = createRow.querySelector('input');
  let newProdNameValue = newProdNameInput.value;
  let newProdPriceInput = createRow.querySelector("input[type='number']");
  let newProdPriceValue = Number(newProdPriceInput.valueAsNumber).toFixed(2);

  const newTableRow = document.createElement('tr');
  newTableRow.className = 'product';
  newTableRow.innerHTML = `
    <td class="name">
      <span>${newProdNameValue}</span>
    </td>
    <td class="price">$<span>${newProdPriceValue}</span></td>
    <td class="quantity">
      <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
      <button class="btn btn-remove">Remove</>
    </td>
  `;

  // get the parent of this newly created row
  const parent = document.querySelector('#cart tbody');

  // append the newly created row to the parent
  parent.appendChild(newTableRow);

  // make sure remove button inherits the same behavior as other remove buttons
  const removeBtn = newTableRow.querySelector('.btn-remove');
  removeBtn.addEventListener('click', removeProduct);

  // clean the fields
  newProdNameInput.value = '';
  newProdPriceInput.value = 0;
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeBtns = [...document.querySelectorAll('.btn-remove')];
  const createBtn = document.querySelector('#create');

  createBtn.addEventListener('click', createProduct)

  for (let i = 0; i < removeBtns.length; i++) {
    removeBtns[i].addEventListener('click', removeProduct)
  }
});
