const express = require ('express')
const mongoose =require ('mongoose')
const userRoutes = require('./routes/routes.js')
const bodyParser = require('body-parser');
const app = express();
mongoose.connect('mongodb://localhost/xcelpros',{ useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex : true })
app.use(express.json())

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
app.use('/user',userRoutes)


app.listen(4000);