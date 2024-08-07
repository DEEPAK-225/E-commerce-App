document.addEventListener("DOMContentLoaded", async () => {

   async function fetchProducts() {
     const response = await axios.get("https://fakestoreapi.com/products");
    //  console.log(response.data);
     return response.data;
    }
     
    async function fetchProductsByCategory(category){
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
     console.log(response.data);
     return response.data;
    }

    async function fetchCategories(){
        // this function is marked async so this will also return a promise
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const data = await response.json();
        // console.log(data);
        return data;
    }
    const downloadedCategories = await fetchCategories();

    const downloadedProducts = await fetchProducts();
    
    async function populateProducts(flag, customProducts) {
        let products = customProducts;
        
        const queryParamsObject = getQueryParams();
        console.log(queryParamsObject['category']);
        if(flag == false){
            if(queryParamsObject['category']){
                products = await fetchProductsByCategory(queryParamsObject['category']);
            }
            else{
                // products = await fetchProducts();
                 products = downloadedProducts;
            }
           
        }
        const productList = document.getElementById("productList");
        products.forEach(product => {
        //  const productList = document.getElementById("productList");
         const productItems = document.createElement("a");
         productItems.target = "_blank";
         productItems.classList.add("product-item", "text-decoration-none","d-inline-block");
         productItems.href = `productDetails.html?id=${product.id}`;
         
         const productImage = document.createElement("div");
         const productName = document.createElement("div");
         const productPrice = document.createElement("div");

         productImage.classList.add("product-img","d-flex","align-item-center","justify-conter-center");
         productName.classList.add("product-name", "text-center");
         productPrice.classList.add("product-price", "text-center"); 
        //    console.log(product.price);
         productName.textContent = product.title.substring(0,12)+"...";
         productPrice.innerHTML = "&#8377; " + Math.floor(`${product.price * 80}`);


         const imageInsideProductImage = document.createElement("img");
         imageInsideProductImage.src = product.image;

         // append divs 
         productImage.appendChild(imageInsideProductImage);
         productItems.appendChild(productImage);
         productItems.appendChild(productName);
         productItems.appendChild(productPrice);

         productList.appendChild(productItems);

        });
    }

   

   const filterSearch = document.getElementById("search");
   filterSearch.addEventListener("click", async () => {
    const productList = document.getElementById("productList");
    const minPrice = Number(document.getElementById("minPrice").value);
    const maxPrice = Number(document.getElementById("maxPrice").value);
    const products = downloadedProducts;
    filteredProducts = products.filter(product => (product.price * 80) >= minPrice && (product.price * 80) <= maxPrice);
        //{  return  (product.price * 80) >= minPrice && (product.price * 80) <= maxPrice;
    // });
    console.log(filteredProducts);
    productList.innerHTML = "";
    populateProducts(true, filteredProducts);
});

const clearFilter = document.getElementById("clear");
clearFilter.addEventListener("click", async() => {
    // const minPrice = document.getElementById("minPrice");
    // const maxPrice = document.getElementById("maxPrice");
    // minPrice.innerHTML ="";
    // maxPrice.textContent = "0";
    // populateProducts(false);
    window.location.reload();
});

async function populateCategories() {
    const categories = downloadedCategories;
    const categoryList = document.getElementById("categoryList");
    categories.forEach(category => {
        // const categoryHolder = document.createElement("div");
        const categoryLink = document.createElement("a");
        categoryLink.classList.add("d-flex", "text-decoration-none");
        categoryLink.href = `productList.html?category=${category}`;
        categoryLink.textContent = category; // setting the category name as the text of anqur tag.
        // categoryHolder.classList.add("category-item", "d-flex", "align-items-center", "justify-content-center")
        // categoryHolder.appendChild(categoryLink);
        categoryList.appendChild(categoryLink);
    });
}

async function downloadContentAndPopulated(){
    
    await populateProducts(false);
    await populateCategories();
    removeLoader();

    // Promise.all([populateProducts(false), populateCategories()])
    // .then(() => {
    //     const loaderBackdrop = document.getElementById("loaderBackdrop");
    //     loaderBackdrop.style.display = "none";
    // });
}
downloadContentAndPopulated();
   
});