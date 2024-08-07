const express=require('express');
const app=express();
const port=5000
const fs=require('node:fs')
//serve static file
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//
// Set up rate limiter

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
  });
  
  
  let currentMode = 'normal';
const readModeFromFile = () => {
    try {
        const data = fs.readFileSync('mode.txt', 'utf8');
        return data.trim(); // Trim any extra whitespace/newlines
    } catch (err) {
        console.error('Error reading mode file:', err.message);
        return 'normal'; // Default mode if file read fails
    }
};


const runMode = (req, res, next) => {
    currentMode = readModeFromFile();
    //console.log('Initial mode set to:', currentMode);
    if (currentMode === 'rateLimit') {
        limiter(req, res, next); // Apply rate limiting
    } else {
        next(); // Proceed if not in rate limiting mode
    }
};

app.use(runMode);
const products= [
    {
        "id": 1,
        "title": "Essence Mascara Lash Princess",
        "price": 9.99
    },
    {
        "id": 2,
        "title": "Eyeshadow Palette with Mirror",
        "price": 19.99
    },
    {
        "id": 3,
        "title": "Powder Canister",
        "price": 14.99
    },
    {
        "id": 4,
        "title": "Red Lipstick",
        "price": 12.99
    },
    {
        "id": 5,
        "title": "Red Nail Polish",
        "price": 8.99
    },
    {
        "id": 6,
        "title": "Calvin Klein CK One",
        "price": 49.99
    },
    {
        "id": 7,
        "title": "Chanel Coco Noir Eau De",
        "price": 129.99
    },
    {
        "id": 8,
        "title": "Dior J'adore",
        "price": 89.99
    },
    {
        "id": 9,
        "title": "Dolce Shine Eau de",
        "price": 69.99
    },
    {
        "id": 10,
        "title": "Gucci Bloom Eau de",
        "price": 79.99
    }
]
app.get('/',(req,res)=>{
  res.json({products,"message":true})
})
app.post('/set-current-mode',(req,res)=>{
    const {mode} = req.body
   // console.log(mode)
    try {
        fs.writeFileSync('mode.txt', mode, 'utf8');
        //console.log("inside try server")
        res.json({message: 'Mode set successfully', mode})
        
    } catch (err) {
        console.log('Error writing mode file:', err.message);
        res.json(err.message)
    }
    
})
app.get('*',(req,res)=>{
    res.json({message: 'path Not Found', status: 404})
})
//listening or starting the server
app.listen(port,()=>{
console.log(`starting the server successfully on ${port}`)
})
