const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(port, () =>{
  console.log(`Server is running on port ${port}`);
})

app.get('/', (req, res) => {
  res.send("Server is connected.");
})


// tempuser
// user123

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tempuser:user123@cluster0.twtdx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    const database = client.db("reviewsDB");
    const reviewsCollection = database.collection("reviews");


    //getting all reviews from database
    app.get('/reviews', async(req, res) => {
      const cursor = reviewsCollection.find();
      const reviews = await cursor.toArray();
      res.send(reviews);
    })

    //posting review to database
    app.post('/addReview', async(req, res) => {
      const review = req.body;

      const result = await reviewsCollection.insertOne(review);
      res.send(result);
      console.log(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);