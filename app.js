require('dotenv').config()
require('express-async-errors')
require('./config/passport')


const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')

//Middlewares
const errorhandlerMiddleware = require('./middleware/errorhandler')
const notFoundMiddleware = require('./middleware/notFound')


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
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions'
  }),
  cookie: { secure: false,
    maxAge: 1000 * 60 * 60 * 24 }
}))

app.set('view engine', 'ejs');
app.use(express.static('./public'))
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use('/auth', authRouter)
app.use('/', secretsRouter)

app.use(errorhandlerMiddleware)
app.use(notFoundMiddleware)


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