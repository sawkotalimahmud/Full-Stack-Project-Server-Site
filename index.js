const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
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
    console.log('database cannected');
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