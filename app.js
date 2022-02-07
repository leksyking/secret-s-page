require('dotenv').config()
require('express-async-errors')


const express = require('express')
const bodyParser = require('body-parser')

//connect to DB
const connectDB = require('./db/secrets')

//Routers
const authRouter = require('./routes/auth')
const secretsRouter = require('./routes/secrets')

const app = express()

//Middlewares
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json())


app.set('view engine', 'ejs');
app.use(express.static('./public'))


//Routes
app.use('/auth', authRouter)
app.use('/', secretsRouter)


const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => console.log(`App started on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}
start()