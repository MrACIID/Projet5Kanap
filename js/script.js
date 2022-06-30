let products = [];

const fetchProduct = async () => {
    await fetch("http://localhost:3000/api/products")
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

    );
};

listProducts()
