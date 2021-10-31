const express = require('express')
var cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');


const app = express()
const port = process.env.PORT || 5000;

//Middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ludk7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('db success cinect')
        const database = client.db('Tour_Buddy')
        const toursCollection = database.collection('tours');
        const orderCollection = database.collection('Manage_Order')


        //Get Tours APi
        app.get('/tours', async (req, res) => {
            const cursor = toursCollection.find({});
            const tours = await cursor.toArray();
            res.send(tours);
        })

        //POST API
        app.post('/tours', async (req, res) => {
            const newUser = req.body;
            const result = await toursCollection.insertOne(newUser);
            console.log('Got new user', req.body);
            console.log('addeded user', result);
            res.json(result);
        })

        //Get Mange Order APi
        app.get('/manageorder', async (req, res) => {
            const cursor = orderCollection.find({});
            const Manage_Order = await cursor.toArray();
            res.send(Manage_Order);
        })

        //POST ORDER API
        app.post('/manageorder', async (req, res) => {
            const newOrder = req.body;
            const result = await orderCollection.insertOne(newOrder);
            console.log('Got new user', req.body);
            console.log('addeded user', result);
            res.json(result);
        })



    }
    finally {
        // await client.close();
    }

}

run().catch(console.dirr)


app.get('/', (req, res) => {
    res.send('Tour BUddy Server iS running');
})

app.listen(port, () => {
    console.log(`Server Running at Port:${port}`)
})