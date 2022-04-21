const express = require('express');
//const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const connectDB = require('./server/database/con');

const app = express();

const conf = require('./config.json');
const environment = process.env.NODE_ENV || 'production';
const config = conf[environment];



app.use(morgan('tiny'));

connectDB();

app.use(bodyParser.urlencoded({ extended : true}))

app.set("view engine", "ejs")

app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


app.use('/', require('./server/routes/router'));
app.use('/usuario', require('./server/routes/router'))



app.listen(3010, () => {
    console.log('Servidor ok')
});