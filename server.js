const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const rateRoute = require('./api/rates')
const app = express() 

//setup cors
app.use(cors())

//configure your body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
        extended: false
}))


//endpoints handlers
app.get('/',(req,res,next)=>{
        res.status(200).json({
                'status':'success',
                'body':'Welcome To Backend Test!',
        });
    })

app.use('/',rateRoute)
//end

//handling invalid request error or any kind of the errors thrown

app.use((req,res,next)=>{
        let error = new Error("Request Not Found!")
        error.status = 404
        next(error)
})

app.use((error,req,res,next)=>{
        res.status(error.status || 500).json({
                status : 'failed',
                body: {
                        error: {
                                status: error.status,
                                message: error.message
                        }
                }
        })
})
const port = process.env.PORT || 3000
app.use(morgan('dev')) 
app.listen(port, ()=>{
        console.log(`App Server is running on port: ${port}`)
})