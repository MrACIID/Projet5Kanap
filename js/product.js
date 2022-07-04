
let str = window.location.href;
let  url = new URL(str);
let id = url.searchParams.get("id");
console.log(id)


const fetchProduct = async () => {
    await fetch (`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((promise) => { 
        console.log(promise);
    })
};

fetchProduct()

