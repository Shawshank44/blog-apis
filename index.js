const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const morgan = require('morgan')
const PostRouter = require('./routes/post')
const cors = require('cors')


require('./db/db')
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))



app.use('/api/post',PostRouter)

app.listen(port, () => {
  console.log(`Server created successfully http://localhost:${port}`)
})