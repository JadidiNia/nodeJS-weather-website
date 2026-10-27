import axios from "axios"
import 'dotenv/config';

const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("Weather API key is not configured");
}

const geoCode = (address , callback)=>{
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timelinemulti?key=${apiKey}&unitGroup=metric&locations=${address}`
    axios.get(url).then(({data})=>{
        callback(undefined, {
            longitude : data.longitude,
            latitude : data.latitude,
            location : data.address,
            weatherData : data
        })
    }).catch((error)=>{
        if(axios.isAxiosError(error)){
            if(error.response){
                callback('Unable to find location. Try another search', undefined)
            }else if(error.request){
                callback('Unable to connect to location service!',undefined)
            }
        }
    })
}

export  {geoCode}