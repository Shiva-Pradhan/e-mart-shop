let isLoggedIn=false;

function showMsg(text){
msg.innerText=text;
msg.style.display="block";
setTimeout(()=>msg.style.display="none",2000);
}

function showLogin(){
modal.innerHTML=`
<div class="modal-content">
<h3>Login</h3>

<input id="email" type="email" placeholder="Enter your email">
<input id="pass" type="password" placeholder="Enter password">

<button onclick="login()">Login</button>
</div>`;
modal.classList.remove("hidden");
}

function login(){
let user=JSON.parse(localStorage.getItem("user"));

if(!user) return showMsg("Invalid user. Signup first");

if(user.email!==email.value || user.pass!==pass.value){
return showMsg("Invalid email or password");
}

isLoggedIn=true;
modal.classList.add("hidden");
showMsg("Login successful");
}

function showSignup(){
modal.innerHTML=`
<div class="modal-content">
<h3>Signup</h3>

<input id="name" placeholder="Enter your name">
<input id="email" type="email" placeholder="Enter your email">
<input id="pass" type="password" placeholder="Enter password">

<button onclick="signup()">Signup</button>
</div>`;
modal.classList.remove("hidden");
}

function signup(){
if(name.value==="") return showMsg("Enter name");
if(!email.value.includes("@")) return showMsg("Invalid email");
if(pass.value.length<4) return showMsg("Password too short");

localStorage.setItem("user",JSON.stringify({
name:name.value,email:email.value,pass:pass.value
}));

modal.classList.add("hidden");
showMsg("Signup successful. Please login");
}

const products=[

{ id:1, name:"Formal Shirt", brand:"Louis Philippe", price:1499, rating:4.3, category:"fashion", type:"men", image:"images/t-shirt.jpg", desc:"Premium cotton formal shirt" },

{ id:2, name:"Slim Jeans", brand:"Levi's", price:2499, rating:4.5, category:"fashion", type:"men", image:"images/jeans.webp", desc:"Stretchable slim fit jeans" },

{ id:3, name:"Casual T-Shirt", brand:"Puma", price:799, rating:4.2, category:"fashion", type:"men", image:"images/puma.webp", desc:"Comfortable cotton t-shirt" },

{ id:4, name:"Women Dress", brand:"Zara", price:2999, rating:4.6, category:"fashion", type:"women", image:"images/zara.webp", desc:"Elegant party wear dress" },

{ id:5, name:"Women Top", brand:"H&M", price:999, rating:4.2, category:"fashion", type:"women", image:"images/top.webp", desc:"Trendy casual top" },

{ id:6, name:"Kurti", brand:"Biba", price:12999, rating:4.4, category:"fashion", type:"women", image:"images/kurti.webp", desc:"Ethnic cotton kurti" },

{ id:7, name:"Kids T-Shirt", brand:"Adidas", price:699, rating:4.1, category:"fashion", type:"boys", image:"images/kidsshirt.webp", desc:"Soft kids wear t-shirt" },

{ id:8, name:"Kids Jacket", brand:"Adidas", price:1999, rating:4.3, category:"fashion", type:"boys", image:"images/adidas1.jpg", desc:"Winter warm jacket" },

{ id:9, name:"Mens Shoes", brand:"Nike", price:100000, rating:4.2, category:"fashion", type:"Mens", image:"images/nikeshoes.webp", desc:"Comfortable running shoes" },

{ id:10, name:"Smartphone", brand:"Samsung", price:125000, rating:4.6, category:"electronics", image:"images/samsung.jpg", desc:"Latest Android smartphone" },

{ id:11, name:"Laptop", brand:"Apple", price:120000, rating:4.8, category:"electronics", image:"images/apple.webp", desc:"MacBook Air M1" },

{id:12, name:"Headphones", brand:"Sony", price:4999, rating:4.5, category:"electronics", image:"images/sony.webp", desc:"Noise cancelling headphones" },

{ id:13, name:"Sofa", brand:"IKEA", price:25000, rating:4.3, category:"furniture", image:"images/sofa.webp", desc:"Luxury 3-seater sofa" },

{ id:14, name:"Chair", brand:"Nilkamal", price:12999, rating:4.1, category:"furniture", image:"images/chair.webp", desc:"Comfortable chair" },

{ id:15, name:"Novel Book", brand:"Penguin", price:499, rating:4.3, category:"books", image:"images/penguin.jpg", desc:"Inspirational book" },

{ id:16, name:"sherwani", brand:"RNG Safawala", price:64000, rating:4.5, category:"fashion", type:"men", image:"images/kurta.webp", desc:"White embroidered sherwani set" },

{ id:17, name:"Formal Pant", brand:"Louis Philippe", price:5999, rating:4.4, category:"fashion", type:"men", image:"images/formalpant.jpg", desc:"Fabric & Comfort" },

{ id:18, name:"Headphones", brand:"Apple", price:67000, rating:4.3, category:"fashion", type:"men", image:"images/headphone.webp", desc:"Personalized Spatial Audio with dynamic head tracking 1" },

];

let filtered=[...products];

function render(){
content.innerHTML=filtered.map(p=>`
<div class="card" onclick="viewProduct(${p.id})">
<img src="${p.image}">
<h4>${p.name}</h4>
<p>${p.brand}</p>
<p>₹${p.price}</p>
<button onclick="addToCart(event,${p.id})">Add</button>
</div>`).join("");
}

function addToCart(e,id){
e.stopPropagation();
if(!isLoggedIn) return showMsg("Login required");
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.push(id);
localStorage.setItem("cart",JSON.stringify(cart));
cartCount.innerText=cart.length;
showMsg("Item added successfully");
}

function showCart(){
let cart=JSON.parse(localStorage.getItem("cart"))||[];

if(cart.length===0){
content.innerHTML="<h2>Cart is empty</h2>";
return;
}

let total=0;

content.innerHTML=cart.map(id=>{
let p=products.find(x=>x.id===id);
total+=p.price;
return `<div class="card">${p.name} - ₹${p.price}</div>`;
}).join("") + `
<h3>Total Items: ${cart.length}</h3>
<h3>Total Amount: ₹${total}</h3>
<button onclick="clearCart()">Clear Cart</button>
<button onclick="goHome()">Back</button>
`;
}

function clearCart(){
localStorage.removeItem("cart");
cartCount.innerText=0;
showMsg("Cart cleared");
goHome();
}

function viewProduct(id){
let p = products.find(x=>x.id===id);

content.classList.add("center-view");

content.innerHTML = `
<div class="product-view">
  <img src="${p.image}">
  
  <h2>${p.name}</h2>
  ${p.type ? `<p><b>Type:</b> ${p.type}</p>` : ""}
  <p><b>Brand:</b> ${p.brand}</p>
  <p><b>Price:</b> ₹${p.price}</p>
  <p>${p.desc}</p>

  <button onclick="addToCart(event,${p.id})">Add to Cart</button>
  <button onclick="buyNow(${p.id})">Buy Now</button>
  <button onclick="goHome()">Back</button>
</div>
`;

window.scrollTo({top:0, behavior:"smooth"});
}

function goHome(){
content.classList.remove("center-view"); 
filtered = [...products];
render();
}

function buyNow(id){
if(!isLoggedIn) return showMsg("Login required");
let p=products.find(x=>x.id===id);
alert("Total Amount: ₹"+p.price);
alert("Order placed successfully");
}


function searchProducts(){
let t=search.value.toLowerCase();
filtered=products.filter(x=>x.name.toLowerCase().includes(t));
render();
}

function applyFilters(){

let c = category.value;
let p = price.value;
let r = rating.value;
let t = type.value;

if(c === "fashion"){
  type.style.display = "inline-block";
}else{
  type.style.display = "none";
  t = "all"; 
}

filtered = products.filter(x =>
  (c==="all" || x.category===c) &&
  (p==="all" || x.price<=p) &&
  (r==="all" || x.rating>=r) &&
  (t==="all" || x.type===t)
);

render();
}

render();

let heroIndex = 0;

const heroSlides = [
{
title:"👋 Welcome to E-mart",
text:"Explore Shopping Like Never Before",
btn:"Start Shopping"
},
{
title:"🔥 Best Electronic Gadgets Are Here",
text:"Top Quality Laptops, Phones & Accessories",
btn:"View Electronics"
},
{
title:"👟 Fashion Collection",
text:"Trending shoes, dresses & styles",
btn:"Explore Fashion"
},
{
title:"🛋 Premium Furniture Collection",
text:"Comfort & Luxury for your home",
btn:"View Furniture"
},
{
title:"📚 Books & Learning",
text:"Grow your knowledge every day",
btn:"Explore Books"
}
];

function randomColor(){
let letters = "0123456789ABCDEF";
let color = "#";
for(let i=0;i<6;i++){
color += letters[Math.floor(Math.random()*16)];
}
return color;
}

function showHero(){
let s = heroSlides[heroIndex];

const hero = document.querySelector(".hero");

hero.style.background = randomColor();

hero.innerHTML = `
<div>
<h2>${s.title}</h2>
<p>${s.text}</p>
<button onclick="scrollProducts()">${s.btn}</button>
</div>
`;

heroIndex = (heroIndex + 1) % heroSlides.length;
}

setInterval(showHero, 3000);
showHero();

function scrollProducts(){
document.getElementById("content").scrollIntoView({behavior:"smooth"});
}


