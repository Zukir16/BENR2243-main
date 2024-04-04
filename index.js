const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

//new user
app.post('/user register', async (req, res) => {   //request, response
  //console.log(req.body)
  // insertOne
  //console.log('new user entry')
  //client.db('ClusterSyakir').collection('users').insertOne({
  let result = await client.db('maybank2u').collection('users').insertOne(
  {  
    username: req.body.username,
    password: req.body.password,   
    name: req.body.name,
    email: req.body.email
  })
})
console.log(req.params)
//get user profile
app.get('/user/:siapadia/:emaildia', async (req, res) => {   //request, response
  //findOne
  let result = await client.db('maybank2u').collection('users').insertOne(
  {  
    username: req.params.siapadia,
    email: req.params.emaildia
  })
  //console.log('find user entry')
console.log(req)
})

res.send(result)

//update user account
app.patch('/user', (req, res) => {   //request, response
  // updateOne
  console.log('update user entry')

})

//delete user account
app.delete('/user', (req, res) => {   //request, response
  //deleteOne
  console.log('delete user entry')

})


app.get('/', (req, res) => {
   res.send('BERR 2423 Database and Cloud')
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

    //await client.db("admin").command({ ping: 1 });
    //console.log("Pinged your deployment. You successfully connected to MongoDB!");

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
    await client.close();
  }
}
run().catch(console.dir);
