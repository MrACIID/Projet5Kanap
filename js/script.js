fetch("http://localhost:3000/api/products")
.then (res => res.json()) 
.then (data => console.log(data)) 
    
var element = document.getElementById("items");
element.innerHTML = `<h3 class="productName">""</h3>` 

