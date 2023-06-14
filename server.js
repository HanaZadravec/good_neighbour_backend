const express= require('express');
const app = express();
var routes=require('./routes/routes');
const mongoose = require('mongoose');
const cors=require('cors');

app.use(cors({
    origin:"http://localhost:8080"
}));

app.listen(5000, function check(error){
    if(error)
    console.log(err);
    else 
    console.log("started");
})

const uri = "mongodb+srv://hana:1234@projekt.i5rabbv.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('Successfully connected to DB');
});

connection.on('error', (err) => {
  console.error('Error connectiong to DB:', err);
});

app.use(express.json());
app.use(routes);
