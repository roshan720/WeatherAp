const { response } = require("express");
const express = require("express");
const https =require ("https");
const bodyParser=require("body-parser")

const app =express();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req,res){  
 

    res.sendFile(__dirname+"/index.html");   
});

app.post("/",function(req,res)
{    
  
    
const query =req.body.cityName;
// const apiKey="4446231d7886f7d526d11ab1be75c7d7"
const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid=4446231d7886f7d526d11ab1be75c7d7&units=metric"

// "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid= "+apiKey+"&units=metric"

https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data)
        {
           const weather= JSON.parse(data)
           const temp=weather.main.temp
           const description= weather.weather[0].description
           const icon =weather.weather[0].icon
           const imageUrl="http://openweathermap.org/img/wn/"+icon +"@2x.png"
           console.log(description);
           console.log(temp)
       

   

           res.write("<p1>Now the wheter is currently "+ description + " </p1>");
    
    res.write("<h2>Weather refers to the state of the atmosphere, describing for example the degree to which it is hot or cold, wet or dry, calm or stormy, clear or cloudy </h2>");
    
    res.write("<h1>The temperature in "+ query+" is " + temp + " degree celcius. </h1>");
   

    res.write("<img src="+imageUrl+">");
     
    res.send()

     });
   });
 });

app.listen(process.env.PORT || 3000,function(){
    console.log("Server toh chal raha hai re bhaiwa");
});