const express = require('express')

let app = express()
let port = (8080 || process.env.PORT)
let randomNum;

app('/nearest',function(req,res){
    randomNum = Math.floor(Math.random() * 101)
    if(randomNum % 2 == 0){
        res.send('WDF')
    }
    else{
        res.send('ARN')
    }
})

app.listen(port)
console.log('Listening at port: '+port);