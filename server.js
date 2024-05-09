const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
}) 

app.get('/dev', (req, res) => {
    res.send('Joker')
}) 

app.get('/products', async(req, res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
       res.status(500).json({message: error.message}) 
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
})

app.post('/products', async(req, res) =>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// atualize seu produto
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // nao achou o produto na database
        if(!product){
            return res.status(404).json({message: `Desculpe não achamos nenhum produto com o ID especificado ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete o produto
app.delete('/products/:id', async(req, res ) => {
    try {
        const{id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `nao foi possível achar nenhum produto com esse ID ${id}`})
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.connect('mongodb+srv://NOME:SENHA@kiryanovapi.3n84kp7.mongodb.net/Node-API?retryWrites=true&w=majority&appName=KiryanovAPI')
.then(() =>{
    console.log('connected to MongoDB')
     app.listen(3000, ()=> {
    console.log(`NODE API app is running on port 3000`)    
})

}).catch(() => {
    console.log(error)
})
