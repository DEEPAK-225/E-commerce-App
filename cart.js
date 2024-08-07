document.addEventListener("DOMContentLoaded", () => {
function prepareWrapperDivForCartItems(product, productQuantityMapping) {
    const orderDetailsProduct = document.createElement("div");
    orderDetailsProduct.classList.add("order-details-product", "d-flex", "flex-row")
    const orderDetailsProductImage = document.createElement("div");
    orderDetailsProductImage.classList.add("order-details-product-img", "d-flex")
    const image = document.createElement("img");
    image.src = product.image;
    orderDetailsProductImage.appendChild(image);
    const orderDetailProductData = document.createElement("div")
    orderDetailProductData.classList.add("order-details-product-data", "d-flex", "flex-column", "justify-content-center")
    const productName = document.createElement("div");
    const productPrice = document.createElement("div");
    productName.textContent = product.title;
    productPrice.innerHTML = "&#8377; " + Math.floor(`${product.price*80}`);
    orderDetailProductData.appendChild(productName);
    orderDetailProductData.appendChild(productPrice);

    const orderDetailsProductActions = document.createElement("div");
    orderDetailsProductActions.classList.add("order-details-product-actions", "d-flex", "flex-column")
    const orderDetailsProductQuantity = document.createElement("div");
    orderDetailsProductQuantity.classList.add("order-details-product-quantity");
    const quantity = document.createElement("div");
    quantity.textContent = "Quantity";
    quantity.classList.add("fw-bold");
    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group");
    const select = document.createElement("select");
    select.classList.add("form-select");
    for(let i = 1; i<=5; i++) {
        const option = document.createElement("option");
        option.textContent = i;
        option.value = i;
        if(i == productQuantityMapping) {
            option.selected = "true";
        }
        select.appendChild(option);
    }
    formGroup.appendChild(select);
    orderDetailsProductQuantity.appendChild(formGroup);
    orderDetailsProductQuantity.appendChild(quantity);
    orderDetailsProductActions.appendChild(orderDetailsProductQuantity);
    const remove = document.createElement("div");
    remove.textContent = "Remove";
    remove.classList.add("order-details-product-remove", "btn", "btn-danger");
    orderDetailsProductActions.appendChild(remove);

    orderDetailsProduct.appendChild(orderDetailsProductImage);
    orderDetailsProduct.appendChild(orderDetailProductData);
    orderDetailsProduct.appendChild(orderDetailsProductActions);

    const hr = document.createElement("hr");

    document.getElementById("orderDetails").appendChild(orderDetailsProduct);
    document.getElementById("orderDetails").appendChild(hr);

}


async function populateCart() {
    const cart = await fetchCartById(5);
    removeLoader();
    const cartProducts = cart.products;
    // console.log(cartProducts);
    const productQuantityMapping = {};
    const cartProductDownloadPromise = cartProducts.map(product => {
        productQuantityMapping[product.productId] = product.quantity;
        // console.log(productQuantityMapping[product.productId]);
        return fetchProductById(product.productId);
        
    });
    
   const products = await Promise.all(cartProductDownloadPromise);
   let totalPrice = 0;
//    console.log(productQuantityMapping);
    //   console.log(products);
   products.forEach(product => {
    // console.log(product.title, product.id, product.price,product.quantity, productQuantityMapping[product.id]);
    prepareWrapperDivForCartItems(product, productQuantityMapping);
    totalPrice += product.price * productQuantityMapping[product.id] ;
   });
   document.getElementById("price-discount").innerHTML = "&#8377; " + Math.floor(`${totalPrice*1.6}`);
   document.getElementById("totalPrice").innerHTML = "&#8377; " + Math.floor(`${totalPrice*80}`);
   document.getElementById("netPrice").innerHTML = "&#8377; " + Math.floor(`${totalPrice*80 - 100}`);

}
populateCart();

});