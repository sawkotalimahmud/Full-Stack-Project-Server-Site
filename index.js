const express = require('express');
const cors = require('cors');
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

    // All Products Api
    app.get('/products', async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    // Get Single Product
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productsCollection.findOne(query);
      res.send(product);
    });

    app.get('/orders', async (req, res) => {
      const orderer = req.query.ordererEmail;
      const query = {orderer: orderer};
      const result = await ordersCollection.find(query).toArray();
      res.send(result);

    })

    // Get All Orders
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