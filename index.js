const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt')

app.use(express.json())

//new user
app.post('/user', async (req, res) => {   //request, response
  //console.log(req.body)
  // insertOne
  //console.log('new user entry')
  //client.db('ClusterSyakir').collection('users').insertOne({

  const hash = bcrypt.hashSync(req.body.password, 10);
  let result = await client.db('ClusterSyakir').collection('users').insertOne(
    {  
      username: req.body.username,
      password: hash,//req.body.password,   
      name: req.body.name,
      email: req.body.email
    }
  );
  res.send(result)
})

app.post('/login', async (req, res) => {   //request, response
  // username: req.body.username
  // password: req.body.password

  // Step 1: Check if the username exists
  let result = await client .db('ClusterSyakir').collection('users').findOne({
    username: req.body.username
  })
  //if(!result) {
  //  res.send("Username not found")
  //  else {
  //  // Step 2: Check if password correct
   // if (bcrypt.compare(req.body.password, result.password) == true) {
   //   res.send("Login successful")
   // } else {
   //   res.send("Password incorrect")
   // }
  //}
  if(result) {
      // Step 2: Check if password correct
      if (bcrypt.compareSync(req.body.password, result.password)) {
        var token = jwt.sign({
          _id: result._id,
          username: result.username,
        }, 'mysupersecretkey');
        res.send(token)
      } else {
        res.status(401).send("Password incorrect")
      }
    }

  console.log(result)
})
//console.log(req.params)
//get user profile
//app.get('/user/:siapadia/:emaildia', async (req, res) => {   //request, response
  //findOne
  //let result = await client.db('ClusterSyakir').collection('users').insertOne(
  //{  
    //username: req.params.siapadia,
    //email: req.params.emaildia
  //});
  //console.log('find user entry')
  //res.send(result);
//})

app.get('/user/:id', async (req, res) => {   //request, response
  console.log(req.params.userId)
  let result = await client.db('ClusterSyakir').collection('users').findOne(
  {
    _id : new ObjectId(req.params.id)
    //name: req.params.name
  })
  res.send(result)
})

//update user account
app.patch('/user/:id', async (req, res) => {   //request, response
  // updateOne
  let result = await client.db('ClusterSyakir').collection('users').updateOne(
  //console.log('update user profile')
  {
    _id : new ObjectId(req.params.id)
  },
  {
    $set: { 
      name: req.body.name,  
    }
  }
  )
  res.send(result)
})

//delete user account
app.delete('/user/:id', async (req, res) => {   //request, response
  //deleteOne
  let result = await client.db('ClusterSyakir').collection('users').deleteOne(
  //console.log('delete user entry')
  {
    _id : new ObjectId(req.params.id)
  }
  )
  res.send(result)
})

app.post('/buy', async (req, res) => {   //request, response
  console.log(req.headers)
})

app.get('/', (req, res) => {
   res.send('Ridhuwan Dan Widad Dan Nikgy Dan Adib Hensem')
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Syakir:Syakir2002_@clustersyakir.pwlh1bs.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSyakir";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    //let result = await client.db('ClusterSyakir').collection('students').insertOne({ 
      //name: "Syakir",
      //age: 19,
      //status: 'A',
  //})
  
    //let result = await client.db('ClusterSyakir').collection('students').updateOne(
      //{ _id: new ObjectId('66051007d636bde827e269ed') },
      //{ $set: { name: 'Afif' } }
    //)
  //console.log(result)

  //console.log("Ridhuwan added to the database with the id: " + result.insertedId)

  //let result = await client.db('ClusterSyakir').collection('students').find().toArray();
  //console.log(result)

  //let result = await client.db('ClusterSyakir').collection('students').find(
    //{
      //name: 'Afif',
      //age: 19
    //}
  //).toArray()
  //console.log(result)

  //let result = await client.db('ClusterSyakir').collection('students').deleteOne(
    //{
      //name: 'Syakir'
    //}
  //).toArray()
  //console.log(result)

} finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);