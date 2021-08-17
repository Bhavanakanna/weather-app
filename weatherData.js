const request=require("request");
const constants= require("../config");
const weatherData=(address, callback)=>{
    const url= constants.OpenWeatherMap.BASE_URL +encodeURIComponent(address) +"&appid=" +constants.OpenWeatherMap.SECRET_KEY;
    
    request({url,json:true}, (error,{body})=>{
        
        if(error){
            callback("cant fetch data ",undefined)
        }else{
            callback(undefined,{
                temperature:body.main.temp,
                description:body.weather[0].description,
                cityName:body.name

            })
        }

    })
}
module.exports= weatherData;