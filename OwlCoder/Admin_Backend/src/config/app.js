const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const Router = require('../routes/UserRoute');
const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());






app.use(cors())  
app.use('/', Router);
// app.use('/users-list',Router);
mongoose.connect("mongodb+srv://kprasanth46:scDQ0e1cIRSPVmTU@owlcoder.igk8t9i.mongodb.net/?retryWrites=true&w=majority").then(()=>console.log('connected to database'))
.then(()=>{
    app.listen(5001)
}).catch((err)=>console.log(err))
    