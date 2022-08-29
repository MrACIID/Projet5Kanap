// Declaration URL de l'api, tableau des produits

let products = [];
let url = "http://localhost:3000/api/products"


// Fetch de l'api et remplissage du tableau products avec la promise

const fetchProduct = async () => {
    await fetch (url)
    .then((res) => res.json())
    .then((promise) => { 
        products = promise;
    })
    .catch((err)=> {
      alert("Erreur, veuillez réessayer plus tard :)")
    })
        
};


// Affichage des "product" dans le tableau "products" a l'aide du .map

const listProducts = async () => {
    await fetchProduct();

    document.getElementById("items").innerHTML += products.map(
    (product) => ` <a href="product.html?id=${product._id}">
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