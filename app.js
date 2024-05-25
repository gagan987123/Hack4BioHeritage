const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const adminroute = require('./routes/admin.js');
const userroute = require('./routes/user.js');
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname,'script')));
app.use(userroute)
app.use('/admin',adminroute);

app.listen(8080);