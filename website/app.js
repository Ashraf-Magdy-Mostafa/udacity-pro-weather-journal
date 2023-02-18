/* --Global Variables-- */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
const apiKey ='c402817b086d5f51d62a0a0b5ffcfc05';
const genBtn = document.getElementById('generate');  /// getting the "button" and assiging it to a "const" variable
////*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/const feelings = document.getElementById('feelings').value;
/* --Global var End-- */

/****
 * making the Generate Button ,adding click event
 * retreiving Data from API
 */

///////adding click listener when clicking on "generate" Button//////////
genBtn.addEventListener("click",async function getTemp(tempData){
        //////////adding const variables/////
        const zipNum= document.querySelector('#zip').value;
        if (zipNum===""){
            window.alert("Empty ZipCode:\n Please enter a Valid ZipCode")
        }
         
        const apiUrl=`https://api.openweathermap.org/data/2.5/weather?zip=${zipNum},us&appid=${apiKey}&units=metric`;
        const tempUrl = await fetch(apiUrl);/////waiting for Api respsonse.
        const fetchedtData = await tempUrl.json();/////changing Api response to understandable java
        const fetchedTemp=fetchedtData.main.temp////extracting the temp from Api response.
        const fixedFetchedTemp=fetchedTemp.toFixed(1);
        /////end of const Variables
        const feelings = document.getElementById('feelings').value;

    await sendData(feelings, fixedFetchedTemp)//////calling a function
    await get()///////calling a fucntion
})

/***
 * end of making Generate Button
 * end of API
 */
///////////////////////////////////////////////////
/****
 * start fucntion (getting data from api// )
 */
const sendData = async function sendData(feelings, fixedFetchedTemp){
            /****
             * "start" constant variables
             *//*
            const zipNum= document.querySelector('#zip').value;
            const apiUrl=`https://api.openweathermap.org/data/2.5/weather?zip=${zipNum},us&appid=${apiKey}&units=metric`;
            const tempUrl = await fetch(apiUrl);/////waiting for Api respsonse.
            */
           // const fetchedtData = await tempUrl.json();/////changing Api response to understandable java
            //const fetchedTemp=fetchedtData.main.temp////extracting the temp from Api response.
           // fixedFetchedTemp=fetchedTemp.toFixed(1);
            
           /*
            "end" of constant variables 
            */
        //const feelings = document.getElementById('feelings').value; /// assiging the feeling variable value
            await fetch('/pushedData', {//// fetching with post method to insert data as an object
                method:'POST',  ///fetch method is "post"
                headers:{
                    "Content-type":"application/json"  ///type of language
                },         
                body: JSON.stringify({ ////sending data as json medium &inserting the 3 inputs (date,temp,feelings) inside "projectData" as object/////
                    date: newDate ,
                    temp: fixedFetchedTemp ,
                    feelings: feelings,
                })
            } )
 };
/*
getting data from server
and assinging fetched data to new data to be displayed in the HTML
*/
///////retrieve the saved data on the server///////

async function get(){
            //////seeting const variables//////
            const date=document.querySelector("#date")          //////setting variable for "date"
            const feelings=document.querySelector("#content")      /////setting variable for "feeling"
            const temp=document.querySelector("#temp")          ////setting variable for "temp"
            const data = await fetch ("/getWethData")   ////fetching the saved Data in "projectData" in the get rquest
            const newdata = await data.json();          ///// making the data in java script language with JSON
            ///done setting const variables////
            ////assiging the fetched data to it's coresponding data container/////
        date.innerHTML=`Date: ${newdata.date}`         //// assigning date to fetched date
        temp.innerHTML=`temprature is: ${newdata.temp} Celsius`     ////assiging temp to fetched temp
        feelings.innerHTML=`Feels ${newdata.feelings}`    ///assigning feelings to fetched feelings
        }