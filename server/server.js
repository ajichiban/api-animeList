/* --- Load Config --- */

require('./config/config')

/* --- Modules --- */
const app = require('express')(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')


/*--- BodyParser's Config ---*/

/*  parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: false }))
/* parse application/json */
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

/* --- Global Route Config --- */
app.use(require('./routes/index'))

/* --- Database Connection --- */
mongoose.connect(process.env.URLDB, (err, res)=>{
    if(err) throw err
    console.log('Database is Ready!')
})


/* --- Running Server --- */
app.listen(process.env.PORT, ()=>{
    console.log(`running in ${process.env.PORT} port`)
})


    

