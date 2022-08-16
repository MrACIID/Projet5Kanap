let localstorageProducts = JSON.parse(localStorage.getItem("panier"));
let apiUrl = "http://localhost:3000/api/products/"
let productInfo = []
let tabletotalPrice = []
let tableQ = []
////////////Si panier vide supression de la clé localstorage

if (localstorageProducts.length == 0) {
  console.log("panier vide");
  localStorage.removeItem("panier")
}

////////////Affichage des éléments du panier

for (i = 0; i < localstorageProducts.length; i++) {
  
  let idProd = localstorageProducts[i].id;
  let colorProd = localstorageProducts[i].colors;
  let quantityProd = localstorageProducts[i].quantity;
  let newApiUrl = apiUrl+idProd
 


const showCart = async () => {      
    if(localstorageProducts){
       await localstorageProducts
        await fetch (newApiUrl)
        .then((res) => res.json())
        .then((data) => 
            productInfo = data)         
       }
       tabletotalPrice.push((productInfo.price)*quantityProd)
       document.getElementById("cart__items").innerHTML += 
`
<article class="cart__item" data-id="${idProd}" data-color="${colorProd}">
    <div class="cart__item__img">
        <img src="${productInfo.imageUrl}" alt="Photographie d'un canapé">
            </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productInfo.name}</h2>
                    <p>${colorProd}</p>
                    <p>${(productInfo.price)*quantityProd}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantityProd}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
             </div>
     </div>
</article>  ` 

  
////////////MISE EN PLACE BOUTON SUPRIMER

let deleteBtn = document.querySelectorAll(".deleteItem");
for (let l = 0; l < deleteBtn.length; l++){
  deleteBtn[l].addEventListener("click", (event) => {
    event.preventDefault();

   //////Selection du produit a supprimer
   
  let selectedIdAndColor = (localstorageProducts[l].id,localstorageProducts[l].colors);
  localstorageProducts = localstorageProducts.filter( el => (el.id,el.colors) !== selectedIdAndColor)
        

   /////Changement du localstorage et reload de la page
   localStorage.setItem("panier" , JSON.stringify(localstorageProducts));
   window.location.href = "cart.html";

  })
} 

////////////CHANGEMENT QUANTITE

let quantityLength = document.querySelectorAll(".itemQuantity")

for (let z = 0; z < quantityLength.length; z++){
  quantityLength[z].addEventListener("change",(event) => {
    let prod = localStorage.getItem("panier");
    prod = JSON.parse(prod);

   prod.map(item => {
     item.quantity = event.target.value;
   });
 
   localStorage.setItem("panier" , JSON.stringify(prod));
})

}

  
//////////Calcul quantités total du panier

let totalQuantityCalc = [];
for (let m = 0; m < localstorageProducts.length; m++){
  let totalQuantityItems = localstorageProducts[m].quantity;
  totalQuantityCalc.push(totalQuantityItems)
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalQuantity = totalQuantityCalc.reduce(reducer);

document.getElementById("totalQuantity").innerHTML = `${totalQuantity}`

/////////////Calcul prix total du panier

const totalPrice = tabletotalPrice.reduce(reducer)
document.getElementById("totalPrice").innerHTML = `${totalPrice}`


}

    showCart();

   
      

};

    


