// Declaration de l'URL et récupération de l'ID avec URL.SearchParams

let str = window.location.href;
let  url = new URL(str);
let id = url.searchParams.get("id");
let productInfo = [];
let apiUrl = `http://localhost:3000/api/products/${id}`

console.log(id)

// Fetch de l'api sur l'id du produit et remplissage du tableau productInfo avec la promise

const fetchProduct = async () => {
    await fetch (apiUrl)
    .then((res) => res.json())
    .then((promise) => { 
        productInfo = promise;
        console.log(productInfo);
    })
};

//Affichage du produit depuis l'HTML

const listProducts = async () => {
    await fetchProduct();

   document.title = `${productInfo.name}`;
   document.getElementsByClassName("item__img")[0].innerHTML += ` <img src="${productInfo.imageUrl}" alt="${productInfo.altTxt}"> `;
   document.getElementById("title").innerHTML += ` ${productInfo.name}`;
   document.getElementById("description").innerHTML += ` ${productInfo.description} `;
   document.getElementById("price").innerHTML += `${productInfo.price}`;

   let colorsOption = document.getElementById("colors");

   productInfo.colors.forEach((colors) => { 

       let singleColor = document.createElement("option");
       singleColor.innerHTML = `${colors}`;
       singleColor.value = `${colors}`;
       colorsOption.appendChild(singleColor);
       
   });

};



listProducts()