const express = require('express');

const app = express()

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
let port = (8080 || process.env.PORT)
let buildingCode;

app.get('/nearest',function(req,res){
    if(buildingCode == 'WDF'){
        res.send('WDF')
    }
    else{
        res.send('ARN')
    }
})
app.post('/nearest',function(req,res){
        console.log(req.body)
        buildingCode = 'WDF'
        res.send('WDF')
    })
app.listen(port,()=>{
    console.log('Listening at port: '+port);
})