const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/215c6121c5d52f4c8e9bb7289682602f/'+latitude+','+longitude+'?[units]=si'
      request({url,json:true},(error,{body})=>{
          if(error){
              callback('Unable to connect to the internet!')
          }
          else if(body.error){
                callback('Unable to find the location!')
          }
          else{
              callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees and there is a '+body.currently.precipProbability+ '% probability of rain')
          }
      })
}
module.exports=forecast