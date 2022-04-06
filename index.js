const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const conf = require('./config.json');
const environment = process.env.NODE_ENV || 'production';
const config = conf[environment];
var cors = require('cors');
const app = express();

const routes = require('./routes/cliente.routes');
mongoose.connect(`mongodb://${config.mongo_ip}:${config.mongo_port}/${config.mongo_collection}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());
app.use('/', routes); 

app.listen(3030, () => {
    console.log('Servidor ok')
});