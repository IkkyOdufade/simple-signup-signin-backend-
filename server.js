const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/nesa', err=>{
if (!err) {
 console.log('Connection Successful')   
}else{
    console.log(err)
}
})
const PORT = 8880;
const blog = require('../omoBlogger/models/blog')
const user = require('./models/user')

app.get('/savedata', (request, respond)=>{
    const data = request.query
    const blogPost = new blog({
        title: data.title,
        author: data.author,
        body: data.body,
        comments: 0,
        date: new Date() 
    })
    blogPost.save((err,doc)=>{
        
            return respond.json(doc)
        })

        // return respond.send('here')
}
)

app.get('./getdata',(request,respond)=>{
  blog.find({'title':'bukola'},(err, doc)=>{
return respond.json(doc)
  })


})



app.post('/register', (request, respond) => {
    const userDetails = request.body
    const newUser = new user(userDetails)
    newUser.save((err, doc) => {
        if(err){
            console.log(`Error`)
            return respond.send(`I have an error`)
        }else{
            return respond.json({
                status: true,
                userDetails: doc
            })
        }
    })
})


app.post('/login',(request,respond)=>{
    const userDetails = request.body
    user.findOne(userDetails, (err,doc)=>{
        if (err){
            respond.send('I have an error')
        }else{
            if (doc){
               return respond.json({
                    status:true,
                    message:"matching user details",
                    userDetails: doc
                })
            }else{
               return respond.json({
                    status:false,
                    message:"no matching user details"
                })
            }
        }
    })
})


app.listen(PORT, (err)=>{
    if (!err) {
        console.log( "Come here baby...")
    }
    else{
        console.log (err)
    }
})