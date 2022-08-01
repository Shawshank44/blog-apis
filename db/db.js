const mongoose = require('mongoose')
// mongodb+srv://shashank:shashank448866@cluster0.o8sv2.mongodb.net/test

mongoose.connect(process.env.MONGOURI).then(()=>{
    console.log('connection success')
}).catch(()=>{
    console.log('connection failed')
})