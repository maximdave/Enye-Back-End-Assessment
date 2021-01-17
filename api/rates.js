const express = require('express')
const axios = require('axios')
const router = express.Router()
require('dotenv').config()

router.get('/api/rates',(req,res,next)=>{
        const base = req.query.base
        const currency = req.query.currency 
        const thirdPartyServiceUrl = process.env.THIRD_PARTY_SERVICE

        if(base != null && currency != null){
                 
        axios.get(`${thirdPartyServiceUrl}?base=${base}&symbols=${currency}`)
        .then(response => {
          res.status(200).json({
                "results": {
                        "base": response.data.base,
                        "date": response.data.date,
                        "rates": response.data.rates
                    }
                
          })
        })
        .catch(error => {
          res.status(400).json({
                status: "failed",
                error: error.message
        })
        });
}else{
        res.status(404).json({
                status: "failed",
                message: "Operation failed due to bad request. base and currency parameters must not be null"
        })
}
      
})

module.exports = router