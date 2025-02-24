const express = require('express')
require('dotenv').config();
const path = require('path')
const app = express()
const port = process.env.PORT || 8888 ;
const hostname = process.env.HOST_NAME;
const configViewEngine = require('./config/viewengine')
const webRoutes = require('./routers/web')
const connection = require('./config/database');
const initAPIRoute = require('./routers/api');
//config template engine
configViewEngine(app);


app.use(express.json());
app.use(express.urlencoded({extended: true}));

//khai bao route
app.use('/', webRoutes);

initAPIRoute(app);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})