import axios from "axios"
import 'dotenv/config';

const API_KEY = process.env.API_KEY;

const geoCode = (address , callback)=>{
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timelinemulti?key=${API_KEY}&unitGroup=metric&locations=${address}`
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