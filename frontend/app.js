
const API = "http://localhost:3000/api";

let cart = [];

function loadProducts(){

fetch(API+"/products",{
headers:{
Authorization:localStorage.getItem("token")
}
})
.then(res=>res.json())
.then(data=>{

let html = "";

data.forEach(p=>{

html += `
<div class="col-md-4">
<div class="card mb-3">
<div class="card-body">
<h5>${p.name}</h5>
<p>$${p.price}</p>
<button class="btn btn-primary" onclick='addCart("${p.name}")'>
Add to Cart
</button>
</div>
</div>
</div>
`;

});

document.getElementById("products").innerHTML = html;

});

}

function addCart(name){

cart.push(name);

let html = "";

cart.forEach(c=>{
html += `<li>${c}</li>`;
});

document.getElementById("cart").innerHTML = html;

}

loadProducts();
