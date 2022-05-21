const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.POST || 5000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello Assignment 12 Im Ready for you hi')
})

app.listen(port, () => {
  console.log(`Assignment 12 server site is ready for work ${port}`)
})