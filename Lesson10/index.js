const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT;
const cors = require('cors')
const router = require('./routes/index')
const {connectDB} = require('./configs/db.cfg')

const whitelist = [
  'https://lesson09.onrender.com',
  'http://localhost:3000',
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'PUT,PATCH,GET,DELETE,UPDATE',
};

connectDB().then(() => {});

app.use(express.json())
app.use(cors());
app.use('/', router)

// vivt3 -> hash

// -> CRUD
app.listen(PORT, () => {
  console.log("Example app listening on port ", PORT)
})