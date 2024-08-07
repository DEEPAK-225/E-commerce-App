document.addEventListener("DOMContentLoaded", () => {
    async function populateproduct() {
        const queryParams = getQueryParams();
        if(queryParams['id']) {
            const productId = queryParams['id'];
            const product = await fetchProductById(productId);
            removeLoader();
            const productName = document.getElementById("productName");
            const productImage = document.getElementById("productImg");
            const productPrice = document.getElementById("productPrice");
            const productDescriptionData = document.getElementById("productDescriptionData");

            productName.textContent = product.title;
            productDescriptionData.textContent = product.description;
            productImage.src = product.image;
            productPrice.innerHTML = "&#8377; " + Math.floor(`${product.price*80}`);
        }
    }
    populateproduct();
    
});

