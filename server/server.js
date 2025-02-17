import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

const veryfyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }

    req.user = decoded;
    next();
  })
}


// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.hjueq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hjueq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    // create a database and collection
    const database = client.db("restaurantDB");
    const foodCollection = database.collection("foods");
    const orderCollection = database.collection("orders");


    // JWT API
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "5h" });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false, // set to true for production
        })
        .send({ message: "Successfully Logged In" });
    })

    app.post("/logout", (req, res) => {
      res
      .clearCookie("token", {
        httpOnly: true,
        secure: false, // set to true for production
      })
      .send({ message: "Successfully Logged Out" });
    })


    // LOADING FOODS DATA API
    // load all foods
    app.get("/foods", async (req, res) => {
      const result = await foodCollection.find({}).toArray();
      res.send(result);
    });

    // load top 6 foods
    app.get("/top-foods", async (req, res) => {
      const result = await foodCollection.find()
        .sort({ purchase_count: -1 })
        .limit(6)
        .toArray();

      res.send(result);
    })

    // load a single food
    app.get("/foods/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await foodCollection.findOne(query);
      res.send(result);
    });

    // load my-foods
    app.get("/my-foods", veryfyToken, async (req, res) => {
      if (req.user.email !== req.query.email) {
        return res.status(403).send({ message: "Forbidden Access" });
      } 

      const email = req.query.email;
      const query = { "addBy.email": email };
      const result = await foodCollection.find(query).toArray();
      res.send(result);
    });

    // add food
    app.post("/foods",veryfyToken,  async (req, res) => {
      if(req.user.email !== req.body.addBy.email) {
        return res.status(403).send({ message: "Forbidden Access" });
      }

      const food = req.body;
      const result = await foodCollection.insertOne(food);
      res.send(result);
    });

    // update food
    app.patch("/foods/:id", veryfyToken, async (req, res) => {
      if(req.user.email !== req.body.addBy.email) {
        return res.status(403).send({ message: "Forbidden Access" });
      }

      const { id } = req.params;
      const filter = { _id: new ObjectId(id) };
      const data = req.body;
      const result = await foodCollection.updateOne(filter, { $set: data });
      res.send(result);
    });


    // ORDER API
    // view my orders
    app.get("/orders", veryfyToken, async (req, res) => {
      // console.log(req.cookies);
      const email = req.query.email;
      if (req.user.email !== email) {
        return res.status(403).send({ message: "Forbidden Access" });
      }

      const query = { buyerEmail: email };
      const result = await orderCollection.find(query).toArray();
      res.send(result);
    });

    // add to orders collection
    app.post("/orders", veryfyToken, async (req, res) => {
      if (req.user.email !== req.body.buyerEmail) {
        return res.status(403).send({ message: "Forbidden Access" })
      }

      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.send(result);
    });

    // delete order
    app.delete("/orders/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});