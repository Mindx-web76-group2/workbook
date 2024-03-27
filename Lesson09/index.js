const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT;
const router = require('./routes/index')
const {connectDB} = require('./configs/db.cfg')
connectDB().then(() => {
  
});

app.use(express.json())

app.use('/', router)

app.listen(PORT, () => {
  console.log("Example app listening on port ", PORT)
})