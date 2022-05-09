const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

//middleware
// app.use(cors());
const corsConfig = {
    origin: true,
    credential: true,
}
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wglcy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const itemCollection = client.db('warehouse').collection('item');

        //GET all item
        app.get('/item', async (req, res) => {
            const query = {};
            const cursor = itemCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        })

        //GET single item
        app.get('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const item = await itemCollection.findOne(query);
            res.send(item);
        })

        //my items
        app.get('/item', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const cursor = itemCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        })

        //POST/ add new item
        app.post('/item', async (req, res) => {
            const newItem = req.body;
            const result = await itemCollection.insertOne(newItem);
            res.send(result);
        })

        //Update a item(quantity)
        app.put('/item/:id', async (req, res) => {
            const id = req.params.id;
            const updatedItemQuantity = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    quantity: updatedItemQuantity.quantity,
                }
            };
            const result = await itemCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

        //Update a item
        app.put('/item/:id', async (req, res) => {
            const id = req.params.id;
            const updatedItem = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    name: updatedItem.name,
                    price: updatedItem.price,
                    quantity: updatedItem.quantity,
                    sold: updatedItem.sold,
                    supplierName: updatedItem.supplierName,
                    description: updatedItem.description,
                    img: updatedItem.img
                }
            };
            const result = await itemCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

        //Delete a item
        app.delete('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await itemCollection.deleteOne(query);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Bike warehouse is running...');
});

app.listen(port, () => {
    console.log('Bike warehouse-management is running on port', port);
});