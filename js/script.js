let products = [];
let url = "http://localhost:3000/api/products"

const fetchProduct = async () => {
    await fetch (url)
    .then((res) => res.json())
    .then((promise) => { 
        products = promise;
        console.log(products);
    })
};

const listProducts = async () => {
    await fetchProduct();

    document.getElementById("items").innerHTML += products.map(
    (product) => ` <a href="${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>
    `

    ).join('');
};

listProducts()
