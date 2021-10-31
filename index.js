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
    }
    finally {
        await client.close();
    }

}

run().catch(console.dirr)


app.get('/', (req, res) => {
    res.send('Tour BUddy Server iS running');
})

app.listen(port, () => {
    console.log(`Server Running at Port:${port}`)
})