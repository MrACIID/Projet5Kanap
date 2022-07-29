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
let choosedQuantity = parseInt(document.getElementById("quantity").value); 


function alertChoice() {
  if ( choosedOption ===  "" && choosedQuantity == 0) {
  alert("Choisissez une couleur et une quantité")
}

else if ( choosedOption ===  "") {
  alert("Choisissez une couleur")
}

else if ( choosedQuantity ==  0) {
  alert("Choisissez une couleur")
}
}
alertChoice()




const choosedOptionAndQuantity = Object.assign({},  {
id: `${id}`,   
colors: `${choosedOption}` , 
quantity: parseInt(`${choosedQuantity}`),

});

         //Envoi des produits dans le local storage si panier vide 

         if (localstorageProducts == null && (choosedOption > "" && choosedQuantity > 0)){
            localstorageProducts = [];
            localstorageProducts.push(choosedOptionAndQuantity);
            localStorage.setItem("panier", JSON.stringify(localstorageProducts));
        }

        //Addition/incrémentation de la QUANTITE lors de l'ajout d'un item identique deja présent dans le panier

        else if (localstorageProducts != null && (choosedOption > "" && choosedQuantity > 0)) {
          for (i = 0; i < localstorageProducts.length; i++) {
            if (
                localstorageProducts[i].id == productInfo._id && 
                localstorageProducts[i].colors == choosedOption
                ){
                return (
                    localstorageProducts[i].quantity += choosedQuantity,   
                    localStorage.setItem("panier", JSON.stringify(localstorageProducts)),
                    (localstorageProducts = JSON.parse(localStorage.getItem("panier")))
                );
              }
            }

        //Si l'item n'est pas un dupliqué alors on l'ajoute au panier en tant que nouvel item.

            for (i = 0; i < localstorageProducts.length; i++) {
                if (
                  (localstorageProducts[i].id == productInfo._id &&
                    localstorageProducts[i].colors != choosedOption) ||
                    localstorageProducts[i].id != productInfo._id
                ) {
                  return (
                    localstorageProducts.push(choosedOptionAndQuantity),
                    localStorage.setItem("panier", JSON.stringify(localstorageProducts)),
                    (localstorageProducts = JSON.parse(localStorage.getItem("panier")))
                  );
                }
            }
          }   
        });
        return (localstorageProducts = JSON.parse(localStorage.getItem("panier")));
        };


listProducts();
