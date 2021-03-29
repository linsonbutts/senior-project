import Popup from './Popup'
import styled from 'styled-components'
import React,{useState, useEffect,useRef} from 'react'
import Woody from '../assets/library.jpg'
import Arnett from '../assets/arnett.jpg'
import Layout from './Layout'
import InterestPoint from './InterestPoint'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
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
const iotDevice = useRef('')
let iotTemp = useRef('')

const tempHandler = async (event) => {
    iotTemp.current = event.detail
    console.log(iotTemp.current)
    await axios.post('/nearest',{
        Temperature: iotTemp.current.toString()
    })
    handleNearest()
}

//Used to connect to microBit
let BTcheck = async () => {
    console.log('The button was pressed')
    try{
        let device = await microBT.requestMicrobit(window.navigator.bluetooth);
        await device.gatt.connect()
        await console.log(device.gatt.connected)
        iotDevice.current = await microBT.getServices(device)
        console.log(iotDevice.current)
        //Services are then logged
        //and Reference objects set equal to them
        await iotDevice.current.temperatureService.setTemperaturePeriod(3000)
        await iotDevice.current.temperatureService.addEventListener("temperaturechanged",tempHandler)

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

useEffect (()=>{
handleNearest()
},[iotTemp])
    return(
     
        <React.Fragment>
            <script type="text/javascript" src="microbit.umd.js"></script>
            <Layout>
            <MicroButton onClick ={BTcheck}>
                    Microbit Connect
                </MicroButton>

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
                    <TabPanel></TabPanel>
                    </Tabs>
                    </div>
            </Layout>
            
        </React.Fragment>
    )
}

export default Building