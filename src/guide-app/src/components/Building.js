import Popup from './Popup'
import styled from 'styled-components'
import React,{useState,useRef} from 'react'
import Woody from '../assets/library.jpg'
import Arnett from '../assets/arnett.jpg'
import Layout from './Layout'
import InterestPoint from './InterestPoint'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {BarChart,Tooltip,Bar, Legend, CartesianGrid, XAxis, YAxis, PieChart, Pie, ResponsiveContainer} from 'recharts';
import 'react-tabs/style/react-tabs.css';
import {mediaController} from './mediaController'

let MicroButton = styled.button`
display: flexbox;
flex-basis: 90%;
background-color: rgba(210,0,0, 0.9);
justify-content: center;
color: white;
padding: 20px;
margin: 15px;
border: 10px solid rgba(200,200,200,.5);
border-radius: 20px;
font-size: 25px;
`
let BPic = styled.img`
display: flexbox;
width: 1000px;
height: 300px;
border-top-left-radius: 20px;
border-bottom-left-radius: 20px;
border-left: 10px solid rgba(240,0,0,0.6);
border-bottom: 10px solid rgba(240,0,0,0.6);
border-top: 10px solid rgba(240,0,0,0.6);
padding: 20px;
flex-basis: 35%;

@media ${mediaController.laptop}{
    max-width: 500px;
}
@media ${mediaController.mobileS}{
    max-width: 150px;    
}
@media ${mediaController.mobileM}{
    max-width: 250px;    
}
@media ${mediaController.mobileL}{
    max-width: 325px;    
}
`

let buildingText = [`
Constructed in 1982, the Atlanta University Center (AUC) 
Robert W. Woodruff Library is named in honor of the late Robert Winship Woodruff, 
philanthropist and former CEO of The Coca-Cola Company. The Library not only services
Clark Atlanta University Students but all other AUC students.
It's services include not only the typical function of libraries but also room reservations for studying
and practicing presentations, free wifi for students, Mac and Windows PCs for students, printing services, etc.


                    Building Hours: Feb 1-May 7
                    Monday – Thursday: 7:30 am – 9pm
                    Friday: 7:30 am – 6pm
                    Saturday: Closed
                    Sunday: 12 pm – 9pm
                        Virtual Hours
                    Monday – Thursday: 9am – 10pm
                    Friday: 9am – 6pm
                    Saturday: 12pm – 6pm
                    Sunday: 12pm – 10pm
                    `,
`
Named after the late Trevor Arnett who served as a trustee of the
Rockefeller Foundation, the Rockefeller Institute for Medical Research, the Davison Fund, Atlanta University, 
Morehouse College, and was President of the Board of Trustees of Spelman College.
He would then be recognized in his life as an authority on the matter of financial administration of colleges
and universities and authored various publications on the matter, including College and University Finance.

In 1942 Trevor Arnett Library under the direction of Hale Woodruff, the annual Exhibition
of Paintings,Prints, and Sculpture by Negro Artists of America (later known as Atlanta University
Art Gallery), to provide black artists a national forum to show their work. The last Exhibition
would take place in 1970. Overtime the hall had been repurposed for the services it is known for today
such as housing the Registrar's office as well as the President's office, though in 1994 the gallery of works present would be renamed
what we now know it as today the Clark Atlanta University Art Museum.


                    Hours for the Museum Gallery:
                    Monday:	    Closed
                    Tuesday:	11:00 am - 4:00 pm
                    Wednesday:	11:00 am - 4:00 pm
                    Thursday:	11:00 am - 4:00 pm
                    Friday:	    11:00 am - 4:00 pm
                    Saturday:	Closed
                    Sunday:	    Closed
                    `
]

const fetch = require('node-fetch')
let url = "https://sleepy-swartz-da47cf.netlify.app/.netlify/functions/server/nearest"
  
let microBT = require('microbit-web-bluetooth')

function Building(){
let [tabIndex, setTabIndex] = useState(0);
let [envClick, setEnvClick] = useState(false);
let [click,setClick] = useState(false)
let [nearest, setNearest] = useState(Woody)
let [nearestText,setNearestText] = useState(buildingText[0])
let arnTime = useRef(0)
let woodTime = useRef(0)
let tempArr = []
let avgTemp;
let lightArr = []
let avgLight;
let pointsVisitedArn = useRef(0);
let pointsVisitedWood = useRef(0);
//Used to track the total session and building time.
//Will update the time data for pie and bar chart
let connectionTime = useRef(0)
let arnSec = useRef(0)
let woodSec = useRef(0)
let arnRunning = false
let woodRunning = false
let neitherPercent = useRef(0);
let arnPercent = useRef(0);
let woodPercent = useRef(0);

//Used to set pins to read on microBit
const Ad_char = "e95d5899-251d-470a-a062-fa1922dfa9a8";
const Io_char = "e95db9fe-251d-470a-a062-fa1922dfa9a8";
let cmd = new Uint32Array([0x01]); 

//Used for building the charts
const barData = [
    {name: "Arnett Time", Time_in_Arnett: arnTime.current},
    {name: "Woody Time", Time_in_Woodruff:  woodTime.current}
]
const pieData = [
    {name: "% of time in Neither", Time_Percentage: neitherPercent.current},
    {name: "% of time in Arnett", Time_Percentage: arnPercent.current},
    {name: "% of time in Woodruff", Time_Percentage: woodPercent.current}
]
let oldTAvg;
const tempHandler = async (event) => {
    console.log("This is the tempArr: "+ tempArr)
            if(lightArr.length < 3){ 
                oldTAvg = avgTemp;
                tempArr.push(event.detail)
            }
            else if(lightArr.length == 3){
                avgTemp = (tempArr[0]+tempArr[1]+tempArr[2])/3
                tempArr = []
                console.log("this the avg temp: "+avgTemp)
                console.log("this is the old average temp: "+ avgTemp)
            }
            else if(oldTAvg != undefined)
                console.log("we made it here temp edition:"+avgTemp)
                if(oldTAvg < avgTemp - 8 || oldTAvg > avgTemp + 8){
                    setEnvClick(true)
                    console.log("The pop up should pop up:  "+envClick)
                }
}



const buttonA_Handler = (event) => {
    if(event.detail == 1){
        arnRunning = true
        woodRunning = false
        fetch(url, {
        method: 'post',
        ButtonPressA:    event.detail
    })
        handleNearest()  
    }
    if(event.detail == 2){
        arnRunning = false
    } 
    
}
const buttonB_Handler = (event) => {
    if(event.detail == 1){
        woodRunning = true
        arnRunning = false
        fetch(url, {
        method: 'post',
        ButtonPressB:    event.detail
    })
        handleNearest()
    }
    else if(event.detail == 2){
        woodRunning = false
    }
    
}

function addWoodySec(){
    if(woodRunning == false){
        neitherPercent.current = (connectionTime.current-woodSec.current+arnTime.current)/connectionTime.current*100
        return
    }
    else{
        //Create the percentages for the pie chart and the time in minutes for bar chart
        woodSec.current +=1
        woodPercent.current = (woodSec.current/connectionTime.current)*100
        console.log("Time spent in WOOD: "+woodSec.current)
        if(woodSec.current % 60 === 0){
            woodTime.current += 1
        }
    };
}
function addArnSec(){
    if(arnRunning == false){
        neitherPercent.current = (connectionTime.current-woodSec.current+arnTime.current)/connectionTime.current*100
        return
    }
    else{
        arnSec.current +=1
        arnPercent.current = arnSec.current/connectionTime.current*100
        console.log("Time spent in ARN: "+arnSec.current)
        if(arnSec.current % 60 === 0){
            arnTime.current += 1
        }
    };
}

var arnInterval = setInterval(addArnSec,1000)
var woodInterval = setInterval(addWoodySec,1000)
//Used to connect to microBit
let BTcheck = async () => {
    //Used to read how long a user spends connected to microbit
    setInterval(function(){
        connectionTime.current +=1
    },1000);
    console.log('The button was pressed')
    try{
        let device = await microBT.requestMicrobit(window.navigator.bluetooth);
        await device.gatt.connect()
        await console.log(device.gatt.connected)
        let services = await microBT.getServices(device)
        console.log(services)
        
        //Configure the IO pin service to read.
        await services.ioPinService.helper.setCharacteristicValue(Io_char, cmd);
        await services.ioPinService.helper.setCharacteristicValue(Ad_char, cmd);
        await services.temperatureService.setTemperaturePeriod(3000)
       
        //await services.magnetometerService.addEventListener("magnetometerbearingchanged",magnetHandler)
        await services.temperatureService.addEventListener("temperaturechanged",tempHandler)
        await services.buttonService.addEventListener("buttonastatechanged",buttonA_Handler)
        await services.buttonService.addEventListener("buttonbstatechanged",buttonB_Handler)
        let oldLAvg
        setInterval(async function(){
            try{
                let lightValue = await services.ioPinService.readPinData()
            console.log("This is the Light Array: "+ lightArr)
            if(lightArr.length < 3){ 
                oldLAvg = avgLight;
                lightArr.push(lightValue[0].value)
            }
            else if(lightArr.length == 3){
                avgLight = (lightArr[0]+lightArr[1]+lightArr[2])/3
                lightArr = []
                console.log("this the avg Light: "+avgLight)
                console.log("this is the old average: "+ oldLAvg)
            }
            else if(oldLAvg != undefined)
                console.log("we made it here"+avgLight)
                if(oldLAvg < avgLight - 50 || oldLAvg > avgLight + 50){
                    setEnvClick(true)
                    console.log("The pop up should pop up:  "+envClick)
                }
        }
        catch(err){
            console.log(err+" pain")
        }
    },3000)
    let magnetReading;
    setInterval(async function(){
        try{
            magnetReading = await (await services.magnetometerService.readMagnetometerData()).z
            console.log(magnetReading)

            if(magnetReading <= -28000 && arnRunning == true && pointsVisitedArn.current < 3){
                pointsVisitedArn.current += 1;
            }

            if(magnetReading <= -28000 && woodRunning == true && pointsVisitedWood.current < 3){
                
                pointsVisitedWood.current += 1;
                //console.log(pointsVisitedWood)
            }

        }catch(err){
            console.log(err+" suffering")
        }
    },3000)

    }catch(err){
        console.log(err+' hurts')
    }
}


let handleNearest = async () => {
    let response = await fetch(url)
    let data = await response.text()
    console.log(data);

    if(data == "WDF"){
        setNearest(Woody)
       setNearestText(buildingText[0])
    }
    else if(data == "ARN"){
        setNearest(Arnett)
        setNearestText(buildingText[1])
    }
}

let handleClick = () => setClick(!click)
let handleEnvClick = () => setEnvClick(false)

    return(
     
        <React.Fragment>
            <script type="text/javascript" src="microbit.umd.js"></script>
            <Layout>
                <h3>
                    Click here to find MicroBit
                </h3>
                <MicroButton onClick ={BTcheck}>
                    Microbit Connect
                </MicroButton>
                <p>
                    Hit A or B on microBit to indicate you have entered a building. A for Arnett and B for Woodruff <br></br>
                    You will be asked if you have entered a building <br></br>
                    if the environment around you has changed
                </p>
                <Popup trigger={envClick}>
                    <div onClick = {handleEnvClick}>
                    <p>
                    Hey it seems like the environment around you has changed
                    Remember to press A or B to indicate which building you have entered
                    and hold A or B if you have exited a building
                    </p>
                    </div>

                
                </Popup>
                <div>
            
                <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                    <TabList>
                        <Tab>Buildings</Tab>
                        <Tab>Data</Tab>
                    </TabList>
                    <TabPanel>
                    <BPic src={nearest} onClick ={handleClick}>
            </BPic>
            <Popup trigger ={click}>
                    <p>
                        {nearestText}
                    </p>
                </Popup>

                <InterestPoint/>
                    </TabPanel>
                    
                    <TabPanel>
                    <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                    <BarChart width={730} height={250} data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Time_in_Arnett" fill="#8884d8" />
                        <Bar dataKey="Time_in_Woodruff" fill="#82ca9d" />
                    </BarChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer>
                    <PieChart width={730} height={250}>
                        <Pie data={pieData} dataKey="Time_Percentage" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label={(entry) => entry.name}/>
                    </PieChart>
                    </ResponsiveContainer>
                    </div>

                    <div>
                        <p>
                            You have visited: {pointsVisitedArn.current} out of 3 interest points in Arnett
                        </p>

                        <p>
                            You have visited: {pointsVisitedWood.current} out of 3 interest points in Woodruff
                        </p>
                    </div>
                    </TabPanel>
                    </Tabs>
                    </div>
            </Layout>
            
        </React.Fragment>
    )
}

export default Building