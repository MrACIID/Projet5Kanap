
let str = window.location.href;
let  url = new URL(str);
let id = url.searchParams.get("id");
let productInfo = [];

console.log(id)


const fetchProduct = async () => {
    await fetch (`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((promise) => { 
        productInfo = promise;
        console.log(productInfo);
    })
};

const listProducts = async () => {
    await fetchProduct();

   document.getElementsByClassName("item__img")[0].innerHTML += ` <img src="${productInfo.imageUrl}" alt="${productInfo.altTxt}"> `
   document.getElementById("title").innerHTML += ` ${productInfo.name}`
   document.getElementById("description").innerHTML += ` ${productInfo.description} `
   document.getElementById("colors").innerHTML += ` <option value="${productInfo.colors}">${productInfo.colors}</option> `
    
};



listProducts()