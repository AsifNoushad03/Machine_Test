const express = require("express")
const app = express();
const mongoose = require("mongoose")
const vehicRouter = require('./routers/vehicelRouter')
const bodyParser = require('body-parser')
const path = require('path')
const exphbs = require('express-handlebars')

// Mongoose Connection
mongoose.connect('mongodb://localhost:27017').then(() => {
    console.log('DB connection established');
}).catch((err) => {
    console.log(err);
})

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, '/views/'))
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }))
app.set('view engine','hbs')

app.use('/vehicle', vehicRouter)

app.listen(5000, () => {
    console.log("Backend server is running!");
});