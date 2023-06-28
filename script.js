let items = [];

function addItem() {
    const itemName = document.getElementById("item-name").value;
    const itemPrice = document.getElementById("item-price").value;
    const itemQuantity = document.getElementById("item-quantity").value;

    if (itemName && itemPrice && itemQuantity) {
        const item = {
            name: itemName,
            price: parseFloat(itemPrice),
            quantity: parseInt(itemQuantity)
        };

        items.push(item);

        renderItems();

        document.getElementById("item-name").value = "";
        document.getElementById("item-price").value = "";
        document.getElementById("item-quantity").value = "";
    }
}

function removeItem(index) {
    items.splice(index, 1);
    renderItems();
}

function updateItem(index) {
    const newQuantity = document.getElementById(`item-quantity-${index}`).value;
    items[index].quantity = parseInt(newQuantity);
    renderItems();
}

function renderItems() {
    const itemList = document.getElementById("item-list");
    itemList.innerHTML = "";

    items.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
      <span>${item.name}</span>
      <input type="number" id="item-quantity-${index}" value="${item.quantity}" min="1">
      <span>$${item.price.toFixed(2)}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button onclick="updateItem(${index})">Update</button>
      <button onclick="removeItem(${index})">Remove</button>
    `;
        itemList.appendChild(li);
    });
}

function calculateTotal() {
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById("total-price").innerText = `Total: $${totalPrice.toFixed(2)}`;
}

function generateInvoice() {
    const invoiceList = document.getElementById("invoice-list");
    invoiceList.innerHTML = "";

    let total = 0;

    items.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
      <span>${item.name}</span>
      <span>${item.quantity}</span>
      <span>$${item.price.toFixed(2)}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    `;
        invoiceList.appendChild(li);
        total += item.price * item.quantity;
    });

    const totalLi = document.createElement("li");
    totalLi.innerHTML = `
    <span>Total:</span>
    <span></span>
    <span></span>
    <span>$${total.toFixed(2)}</span>
  `;
    invoiceList.appendChild(totalLi);

    calculateTotal();

    window.print();
}

