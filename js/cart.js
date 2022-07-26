let localstorageProducts = JSON.parse(localStorage.getItem("panier"));
let apiUrl = "http://localhost:3000/api/products/"



const showCart = async () => {      
    if(localstorageProducts){
       await localstorageProducts;
       document.getElementById("cart__items").innerHTML = localstorageProducts.map((panier) =>  `
       <article class="cart__item" data-id="${panier.id}" data-color="${panier.colors}">
                <div class="cart__item__img">
                  <img src="" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>""</h2>
                    <p>${panier.colors}</p>
                    <p>${(apiUrl+panier.id)}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :${panier.quantity} </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
       ` ) 
       
    }
}

showCart();


