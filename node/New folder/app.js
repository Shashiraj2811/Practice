const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const members = require('./member');
const fs = require('fs');


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const PORT = 5200;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


app.get('/', (request, res) =>
 res.render('index', {
   title: 'Member App',
   members
 })
);


