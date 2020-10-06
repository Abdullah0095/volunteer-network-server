const express = require('express')

const bodyParser = require('body-parser');
const cors = require('cors');
const { query } = require('express');


const port = 4000


const app = express()

app.use(cors());
app.use(bodyParser.json());






const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.shlex.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
  const collection = client.db("volunteer-network").collection("volunteer");

   app.post('/addList', (req, res) => {
       const topicList = req.body;
       collection.insertOne(topicList)
       .then(result => {
           res.send(result.insertedCount > 0);
       })
       console.log(topicList);
   }) 

   app.get('/myProgram', (req, res) => {
       collection.find({email: req.query.email})
       .toArray((err, documents) => {
           res.send(documents);
       })
   })


  console.log('db already connected')
});





app.get('/', (req, res) => {
  res.send('Hello Developer World!')
})

app.listen(process.env.PORT || port);