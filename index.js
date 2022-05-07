const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER}@cluster0.wglcy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {

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