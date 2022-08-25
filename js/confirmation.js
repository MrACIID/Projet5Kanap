
//Récuperation de l'id dans l'url 

let str = window.location.href;
let  url = new URL(str);
let id = url.searchParams.get("id");


//Affichage de l'id 


document.getElementById("orderId").innerHTML = `${id}`
