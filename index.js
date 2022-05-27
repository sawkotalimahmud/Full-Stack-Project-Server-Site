const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.POST || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kpfwg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);

async function run (){
  try{
    await client.connect();
    const productsCollection = client.db("assignment-12").collection("products");
    const ordersCollection = client.db("assignment-12").collection("orders");
    const usersCollection = client.db("assignment-12").collection("users");

    // All Products Api
    app.get('/products', async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    // Get All Users Collection
    app.get('/user', async (req, res) => {
      const users= await usersCollection.find().toArray();
      res.send(users);
    });

    // Get users Collection
    app.put('/user/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = {email: email};
      const option = {upsert: true};
      const updateDoc = {
        $set: user,
      };
      const result = await usersCollection.updateOne(filter, updateDoc, option);
      const token = jwt.sign({email: email}, process.env.ACCESS_TOKEN_SECRET)
      res.send({result, token});
    });

    // Make Admin Api
    app.put('/user/admin/:email', async (req, res) => {
      const email = req.params.email;
      const filter = {email: email};
      const updateDoc = {
        $set: {role: 'admin'},
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Get Single Product
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productsCollection.findOne(query);
      res.send(product);
    });

  // Get All Orders
    app.get('/orders', async (req, res) => {
      const orderer = req.query.ordererEmail;
      const query = {orderer: orderer};
      const result = await ordersCollection.find(query).toArray();
      res.send(result);
    });

    // Post All Orders
    app.post('/orders', async (req, res) => {
      const orders = req.body;
      const result = await ordersCollection.insertOne(orders);
      res.send(result)
  });
  }
  finally{

  }
}
run().catch(console.dri)


app.get('/', (req, res) => {
  res.send('Hello Assignment 12 Im Ready for you hi')
})

app.listen(port, () => {
  console.log(`Assignment 12 server site is ready for work ${port}`)
})