const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();
app.use(cors({
  origin: 'https://chill-gamer-op.netlify.app' 
}));
app.use(express.json());

app.listen(port, () =>{
  console.log(`Server is running on port ${port}`);
})

app.get('/', (req, res) => {
  res.send("Server is connected.");
})


const uri = "mongodb+srv://tempuser:user123@cluster0.twtdx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  tls: true,
  serverSelectionTimeoutMS: 3000,
  autoSelectFamily: false,
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // const database = client.db("reviewsDB");
    const reviewsCollection = client.db("reviewsDB").collection("reviews");
    const watchListCollection = client.db("reviewsDB").collection("watchlist");


    // get a single review by id
    app.get('/reviews/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await reviewsCollection.findOne(query);
      res.send(result);
      // console.log(result);
    })


    // get all watchlist data from database
    app.get('/watchlist', async(req, res) => {
      const cursor = watchListCollection.find();
      const watchlist = await cursor.toArray();
      res.send(watchlist);
    })


 // probably the best function i wrote in this project
   // post a favorite movie to the watchlist
app.post('/watchlist', async (req, res) => {
  const watchListGameData = req.body;

  // query to check user and game is unique in the watchlist
  const query = {
    myEmail: watchListGameData.myEmail,
    gameTitle: watchListGameData.gameTitle
  };

  try {
    // Check the duplicay of the entry
    const existingEntry = await watchListCollection.findOne(query);

    if (existingEntry) {
      return res.status(400).json({
        success: false,
        message: 'This game is already in your watchlist.',
      });
    }

    // If not, insert the new data
    const result = await watchListCollection.insertOne(watchListGameData);
    res.status(201).json({
      success: true,
      message: 'Game added to watchlist successfully!',
      data: result,
    });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while adding to the watchlist.',
    });
  }
});




app.get('/reviews', async (req, res) => {
  const genre = req.query.genre;
  const query = genre && genre !== "default" ? { genre: genre } : {};  
  const cursor = reviewsCollection.find(query);
  const reviews = await cursor.toArray();
  res.send(reviews);
});


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
      // console.log(result);
    })


    // getting user's own reviews from database
    app.get('/myReviews', async(req, res) => {
      const email = req.query.email;
      const query = {userEmail : email};

      const cursor = reviewsCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
      console.log(reviews);
    })

    // getting user review
    app.get('/updateReview/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};

      const result = await reviewsCollection.findOne(query);
      res.send(result);
    })

    // updating a review by id
    app.put('/updateReview/:id', async(req, res) => {
      const id = req.params.id;
      const review = req.body;
      const query = {_id : new ObjectId(id)};
      const update = {
        $set: {
          gameCover: review.gameCover,
          gameTitle: review.gameTitle,
          reviewDescription: review.reviewDescription,
          rating: review.rating,
          genre: review.genre,
        }
      }
      const result = await reviewsCollection.updateOne(query, update);
      res.send(result);
      console.log(result);
    })

    //delete a review by id
    app.delete('/deleteReview/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await reviewsCollection.deleteOne(query);
      res.send(result);
      console.log(result);
    })


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
