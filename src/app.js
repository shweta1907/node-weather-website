const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
//define paths for express config
const viewPath=path.join(__dirname,'../templates/views')
app.use(express.static(path.join(__dirname,'../public')))
const partialPath=path.join(__dirname,'../templates/partials')
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
//setup static directory to serve
app.get('',(req,res)=>{
    res.render('index',
    {'title':'Weather',
    'location':'New york',
    'name':'Created by Shweta Sharma'
})
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Created by Shweta Sharma'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'An Address is a must!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
if(error)
{
    return res.send({error})
}
forecast(latitude,longitude,(error,forecastData)=>{
    if(error)
    {
        return res.send({error})
    }
    res.send({
        'forecast':forecastData,
         location,
        'address':req.query.address
    })
})
    })
    
})
app.get('/help',(req,res)=>{
res.render('help',{
    name:'Created by Shweta Sharma',
    title:'Help Page'
})
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        error:'Help page not found!',
        name:'created by Shweta Sharma'
    })
})
app.get('*',(req,res)=>{
      res.render('error',{error:'My 404 Page',
            title:'404',
            name:'Created by Shweta Sharma'
})
})
app.listen(3000,()=>{
    console.log('server is up on port 3000')
})