// Declaration de l'URL et récupération de l'ID avec URL.SearchParams

let str = window.location.href;
let  url = new URL(str);
let id = url.searchParams.get("id");
let productInfo = [];
let apiUrl = `http://localhost:3000/api/products/${id}`



// Fetch de l'api sur l'id du produit et remplissage du tableau productInfo avec la promise

const fetchProduct = async () => {
    await fetch (apiUrl)
    .then((res) => res.json())
    .then((promise) => { 
        productInfo = promise;
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

    //Création d'options pour chaque couleurs disponible 
   let colorsOption = document.getElementById("colors");

   productInfo.colors.forEach((colors) => { 

       let singleColor = document.createElement("option");
       singleColor.innerHTML = `${colors}`;
       singleColor.value = `${colors}`;
       colorsOption.appendChild(singleColor);
       
   });
   

//local storage

        //Event listener sur le bouton ajout panier

const additemtoCart = document.getElementById("addToCart")
additemtoCart.addEventListener('click',(event) => {

        //identification des choix, couleur quantité et id du produit 

let choosedOption = document.getElementById("colors").value;
let choosedQuantity = document.getElementById("quantity").value;

const choosedOptionAndQuantity = Object.assign({},  {
id: `${id}`,   
colors: `${choosedOption}` , 
quantity: `${choosedQuantity}`,

});

         //Envoi des produits dans le local storage

let localstorageProducts = JSON.parse (localStorage.getItem("panier"));

if(localstorageProducts){
    localstorageProducts.push([choosedOptionAndQuantity]);
    localStorage.setItem("panier", JSON.stringify(localstorageProducts));
}
else{localstorageProducts = [];
    localstorageProducts.push([choosedOptionAndQuantity]);
    localStorage.setItem("panier", JSON.stringify(localstorageProducts));
    console.log(localstorageProducts);
    
}
 
});

};


listProducts();

