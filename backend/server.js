
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let products = [
{ id:1, name:"Laptop", price:800 },
{ id:2, name:"Keyboard", price:50 }
];

// REGISTER
app.post("/api/auth/register",(req,res)=>{
res.json({message:"Register success"});
});

// LOGIN
app.post("/api/auth/login",(req,res)=>{

const token = jwt.sign(
{ email:req.body.email },
"SECRETKEY",
{ expiresIn:"1h" }
);

res.json({token});

});

// AUTH MIDDLEWARE
function auth(req,res,next){

const token = req.headers["authorization"];

if(!token) return res.sendStatus(401);

jwt.verify(token,"SECRETKEY",(err,user)=>{
if(err) return res.sendStatus(403);
next();
});

}

// GET PRODUCTS
app.get("/api/products",auth,(req,res)=>{
res.json(products);
});

// ADD PRODUCT
app.post("/api/products",auth,(req,res)=>{

const newProduct = {
id: products.length+1,
name:req.body.name,
price:req.body.price
};

products.push(newProduct);

res.json({message:"Product added"});

});

// DELETE PRODUCT
app.delete("/api/products/:id",auth,(req,res)=>{

const id = parseInt(req.params.id);
products = products.filter(p=>p.id!==id);

res.json({message:"Product deleted"});

});

app.listen(3000,()=>{
console.log("Server running on port 3000");
});
