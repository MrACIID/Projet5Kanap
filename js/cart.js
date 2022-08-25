let localstorageProducts = JSON.parse(localStorage.getItem("panier"));
let apiUrl = "http://localhost:3000/api/products/"
let productInfo = []
let tabletotalPrice = []

////////////Si panier vide supression de la clé localstorage

if (localstorageProducts.length == 0) {
  alert("panier vide")
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

  let selectedIdAndColor = (localstorageProducts[l].colors + localstorageProducts[l].id );
  localstorageProducts = localstorageProducts.filter( el => ( el.colors + el.id ) !== selectedIdAndColor)


   /////Changement du localstorage et reload de la page
   localStorage.setItem("panier" , JSON.stringify(localstorageProducts));
   window.location.href = "cart.html";

  })
}

////////////CHANGEMENT QUANTITE

let quantityLength = document.querySelectorAll(".itemQuantity")

quantityLength.forEach((product) => {
  let prodInfo = product.closest("[data-id]")
  let prodId = prodInfo.getAttribute("data-id")
  let prodColor = prodInfo.getAttribute("data-color")

  product.addEventListener("change",(event) => {
    
    for (z=0; z < localstorageProducts.length; z++){
      if (localstorageProducts[z].id == prodId && localstorageProducts[z].colors == prodColor){
        return localstorageProducts[z].quantity = event.target.value,
        console.log("Nouvelle quantité"),
        localStorage.setItem("panier" , JSON.stringify(localstorageProducts)),
        window.location.href = "cart.html";
      }
    }
  })
})



  
//////////Calcul quantités total du panier

let totalQuantityCalc = [];
for (let m = 0; m < localstorageProducts.length; m++){
  
  let totalQuantityItems = parseInt(localstorageProducts[m].quantity);
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


//FORMULAIRE

const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const address = document.getElementById("address")
const city = document.getElementById("city")
const email = document.getElementById("email")
let submit = document.getElementById("order")


let valuefirstName, valuelastName, valueAddress, valueCity, valueEmail;

  // VALIDATION PRENOM

firstName.addEventListener("input",function (event) {
  valuefirstName;
  if(event.target.value.length == 0) {
    firstNameErrorMsg.innerHTML = "";
    valuefirstName = null
  }
  else if (event.target.value.length < 2 || event.target.value.length > 15){
    firstNameErrorMsg.innerHTML = "Le Prénom doit étre entre 1 et 15 lettres"
    valuefirstName = null
  }
  if (event.target.value.match(/^[a-z A-Z]{2,15}$/)){
    firstNameErrorMsg.innerHTML = ""
    valuefirstName = event.target.value;
  }
  if (!event.target.value.match(/^[a-z A-Z]{2,15}$/) && 
    event.target.value.length > 2 &&
    event.target.value.length < 15 ) {
      firstNameErrorMsg.innerHTML = "Le Prénom ne doit pas contenir de caractéres spécial, chiffres ou accents"
      valuefirstName = null
    }
});

  // VALIDATION NOM

lastName.addEventListener("input",function (event) {
  valuelastName;
  if(event.target.value.length == 0) {
    firstNameErrorMsg.innerHTML = "";
    valuelastName = null
  }
  else if (event.target.value.length < 2 || event.target.value.length > 15){
    lastNameErrorMsg.innerHTML = "Le Nom doit étre entre 1 et 15 lettres"
    valuelastName = null
  }
  if (event.target.value.match(/^[a-z A-Z]{2,15}$/)){
    lastNameErrorMsg.innerHTML = ""
    valuelastName = event.target.value;
  }
  if (!event.target.value.match(/^[a-z A-Z]{2,15}$/) && 
    event.target.value.length > 2 &&
    event.target.value.length < 15 ) {
      lastNameErrorMsg.innerHTML = "Le Nom ne doit pas contenir de caractéres spécial, chiffres ou accents"
      valuelastName = null
    }
});

   // VALIDATION ADRESSE


address.addEventListener("input",function (event) {
  valueAddress;
  if(event.target.value.length == 0) {
    addressErrorMsg.innerHTML = "";
    valueAddress = null
  }
  else if (event.target.value.length < 2 || event.target.value.length > 35){
    addressErrorMsg.innerHTML = "Adresse doit étre entre 2 et 35 lettres"
    valueAddress = null
  }
  if (event.target.value.match(/^[a-z A-Z 0-9]{2,35}$/)){
    addressErrorMsg.innerHTML = ""
    valueAddress = event.target.value;
  }
  if (!event.target.value.match(/^[a-z A-Z 0-9]{2,35}$/) && 
    event.target.value.length > 2 &&
    event.target.value.length < 35 ) {
      addressErrorMsg.innerHTML = "Adresse ne doit pas contenir de caractéres spécial, chiffres ou accents"
      valueAddress = null
    }
});

  // VALIDATION VILLE

city.addEventListener("input",function (event) {
  valueCity;
  if(event.target.value.length == 0) {
    cityErrorMsg.innerHTML = "";
    valueCity = null
  }
  else if (event.target.value.length < 2 || event.target.value.length > 15){
    cityErrorMsg.innerHTML = "La Ville doit étre entre 2 et 15 lettres"
    valueCity = null
  }
  if (event.target.value.match(/^[a-z A-Z]{2,15}$/)){
    cityErrorMsg.innerHTML = ""
    valueCity = event.target.value;
  }
  if (!event.target.value.match(/^[a-z A-Z]{2,15}$/) && 
    event.target.value.length > 2 &&
    event.target.value.length < 15 ) {
      cityErrorMsg.innerHTML = "La Ville ne doit pas contenir de caractéres spécial, chiffres ou accents"
      valueCity = null
    }
});


  // VALIDATION EMAIL

email.addEventListener("input", function (event){
if (event.target.value.length == 0){
  emailErrorMsg.innerHTML = "";
  valueEmail = null;
}
else if (event.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/)) {
  emailErrorMsg.innerHTML = ""
  valueEmail = event.target.value;
}
if (
  !event.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/) &&
  !event.target.value.length == 0
) {
  emailErrorMsg.innerHTML = "Email incorrect"
  valueEmail = null;
}

});


submit.addEventListener("click", function (event) {
  event.preventDefault();
  if (valuefirstName && valuelastName && valueCity && valueAddress && valueCity && valueEmail ){
    const totalProd = JSON.parse(localStorage.getItem("panier"));
    let idPanier = [];
    totalProd.forEach((prod) => {
    idPanier.push(prod.id)
    });
    
    const order = {
      contact: {
        firstName: valuefirstName,
        lastName: valuelastName,
        address: valueAddress,
        city: valueCity,
        email: valueEmail,
      },
      products: idPanier,
    };

    fetch(apiUrl+"order", {
      method: "POST",
      headers: {"Content-Type":"application/json" },
      body: JSON.stringify(order)
    })
    .then((res) => res.json())
    .then((promise) => {
      let resApi = promise
      window.location.href = `confirmation.html?id=${resApi.orderId}`
    });
    
   
  }
  else {
    alert ("Veuillez renseigner vos coordonnés")
  }
});