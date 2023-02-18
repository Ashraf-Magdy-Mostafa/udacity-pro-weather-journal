// Setup empty JS object to act as endpoint for all routes
projectData = {

};

// Require Express to run server and routes
const express = require ('express');
const cors = require ('cors');
const bodyParser = require('body-parser')
const Port=3000;

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(Port,()=>{
    console.log('server running at LocalHost:'+Port)
})
/*
adding http "get method" to send the "projectData" when requested.
access it by Url ("localhost:(port)/getWethData")
*/        
app.get("/getWethData", (req, res)=>{
res.send(projectData);//// response of the server by "sending" the data inside the "projectData" OBJECT.
});
/*
adding http "post method" to recive the "fetch.post" method to add the body of fetch req to "projectData" as OBJECT.
*/
app.post("/pushedData", (req, res)=>{
projectData={...req.body};////ADDING object intries from the Fetch.Post method on the client side
res.end();


})