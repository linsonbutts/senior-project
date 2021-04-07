import Popup from './Popup'
import styled from 'styled-components'
import React,{useState,useRef} from 'react'
import Woody from '../assets/library.jpg'
import Arnett from '../assets/arnett.jpg'
import Layout from './Layout'
import InterestPoint from './InterestPoint'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import {BarChart,Tooltip,Bar, Legend, CartesianGrid, XAxis, YAxis, PieChart, Pie} from 'recharts';
import 'react-tabs/style/react-tabs.css';

let BuildingPic = styled.img`
display: flexbox;
width: 500px;
height: 300px;
border-top-left-radius: 20px;
border-bottom-left-radius: 20px;
border-left: 10px solid rgba(240,0,0,0.6);
border-bottom: 10px solid rgba(240,0,0,0.6);
border-top: 10px solid rgba(240,0,0,0.6);
padding: 20px;
flex-basis: 35%;
`

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

let buildingText = [`
This is Woodruff Library it is the campus library for blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
blah blah blah blah bl[h blah blah blah blah blah blah blah blah blah blah blah blah blah
`,
`
This is Trevor Arnett it hosts the blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
`
]
let axios = require('axios').default
let microBT = require('microbit-web-bluetooth')

function Building(){
let [tabIndex, setTabIndex] = useState(0);
let [click,setClick] = useState(false)
let [nearest, setNearest] = useState(Woody)
let [nearestText,setNearestText] = useState(buildingText[0])
let arnTime = useRef(0)
let woodTime = useRef(0)
const iotDevice = useRef('')
let iotTemp = useRef('')

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

const tempHandler = async (event) => {
    iotTemp.current = event.detail
    console.log(iotTemp.current)
    await axios.post('/nearest',{
        Temperature: iotTemp.current.toString()
    })
    handleNearest()
}

const buttonA_Handler = (event) => {
    if(event.detail == 1){
        arnRunning = true
        woodRunning = false
    }
    if(event.detail == 2){
        arnRunning = false
    }   
}
const buttonB_Handler = (event) => {
    if(event.detail == 1){
        woodRunning = true
        arnRunning = false
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
        iotDevice.current = await microBT.getServices(device)
        console.log(iotDevice.current)
        //Services are then logged
        //and Reference objects set equal to them

        await iotDevice.current.temperatureService.setTemperaturePeriod(3000)
        await iotDevice.current.temperatureService.addEventListener("temperaturechanged",tempHandler)
        await iotDevice.current.buttonService.addEventListener("buttonastatechanged",buttonA_Handler)
        await iotDevice.current.buttonService.addEventListener("buttonbstatechanged",buttonB_Handler)

    }catch(err){
        console.log(err +' hurts')
    }
}


let handleNearest = async () => {
    let response = await axios.get('/nearest')
    let data = await response.data

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
                    Hit A or B on microBit to indicate you have entered a building. <br></br>
                    You will be asked if you have entered a building <br></br>
                    if the environment around you has changed
                </p>
                <div>
                <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                    <TabList>
                        <Tab>Buildings</Tab>
                        <Tab>Data</Tab>
                    </TabList>
                    <TabPanel>
                    <BuildingPic src ={nearest} onClick ={handleClick}>
            </BuildingPic>
            <Popup trigger ={click}>
                    <p>
                        {nearestText}
                    </p>
                </Popup>

                <InterestPoint/>
                    </TabPanel>
                    
                    <TabPanel>
                    <BarChart width={730} height={250} data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Time_in_Arnett" fill="#8884d8" />
                        <Bar dataKey="Time_in_Woodruff" fill="#82ca9d" />
                    </BarChart>

                    <PieChart width={730} height={250}>
                        <Pie data={pieData} dataKey="Time_Percentage" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label={(entry) => entry.name}/>
                    </PieChart>
                    
                    </TabPanel>
                    </Tabs>
                    </div>
            </Layout>
            
        </React.Fragment>
    )
}

export default Building