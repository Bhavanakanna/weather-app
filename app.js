const express= require('express');
const hbs= require("hbs");
const path=require("path");
const app= express();
const weatherData= require("../utils/weatherData");
const port= process.env.PORT || 3000;
const publicStaticDirPath= path.join(__dirname,'../public')
const viewspath= path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')
app.set('view engine','hbs');
app.set('views',viewspath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath))
app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather app"
    })
})
app.get('/weather',(req,res)=>{
    const address= req.query.address
    if(!address){
        return res.send({
            error: "You must enter address in the text box"

        })
    }
    weatherData(address,(error,{temperature,description,cityName})=>{
        if(error){
            return res.send({
                error
            })
        }
        console.log(temperature,description,cityName);
        res.send({
            temperature,
            description,
            cityName
        })

       

    })
    
})
app.get('*',(req,res)=>{
    res.send("Page not found");
})
app.listen(port,()=>{
    console.log("Server is up and runnning on the port",port);
})