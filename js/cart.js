let localstorageProducts = JSON.parse(localStorage.getItem("panier"));
let apiUrl = "http://localhost:3000/api/products/"
let productInfo = []


for (i = 0; i < localstorageProducts.length; i++) {
  
  let idProd = localstorageProducts[i].id;
  let colorProd = localstorageProducts[i].colors;
  let quantityProd = localstorageProducts[i].quantity;
  console.log(idProd)
  let newApiUrl = apiUrl+idProd
  console.log(newApiUrl)


const showCart = async () => {      
    if(localstorageProducts){
       await localstorageProducts
        await fetch (newApiUrl)
        .then((res) => res.json())
        .then((data) => 
            productInfo = data)         
       }
       
       document.getElementById("cart__items").innerHTML += 
`
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
        <img src="${productInfo.imageUrl}" alt="Photographie d'un canapé">
            </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productInfo.name}</h2>
                    <p>${colorProd}</p>
                    <p>${productInfo.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :${quantityProd} </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
             </div>
     </div>
</article>  `  
    }

    showCart();
}





