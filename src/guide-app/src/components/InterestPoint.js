import styled from 'styled-components'
import React,{useState, useEffect} from 'react'
import Layout from './Layout'
import MuseumImage from '../assets/museum.jpg'
import SpiritTime from '../assets/spiritTime.jpg'
import CafeImage from '../assets/cafe.jpg'
import ArchImage from '../assets/archives.jpg'
import SculptImage from '../assets/woodiSculpt.jpg'
import Popup from './Popup'

let Collage = styled.div`
margin: 10px;
display: flex;
flex-direction: column;
align: right;
`
let InterestPic = styled.img`
margin: 10px;
display: flex;
width: 250px;
height: 250px;
border-top-right-radius: 10px;
border-bottom-right-radius: 10px;
border-right: 10px solid rgba(240,0,0,0.6);
border-bottom: 10px solid rgba(240,0,0,0.6);
border-top: 10px solid rgba(240,0,0,0.6);
padding: 15px;
float: left;
clear: left;
`

let WoodyPointText = [
    `This is the Woody Cafe blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah`
,
`This is one of the many sculptures and art pieces within the Woodruff Library blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah`
,
`These are the archives of the Woodruff Library blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah`
]
let ArnPointText = [
    `This is the sculpture Spiritual Time blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
    blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
    blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah`
    ,
    `These are some pieces from the Clark Atlanta Art Museum blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
    blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
    blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah`
    ,
    ` 3rd Image blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
    blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
    blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah`]

let WoodyArr = [CafeImage,SculptImage,ArchImage]
let ArnArr = [SpiritTime,MuseumImage]

let axios = require('axios').default

function InterestPoint(){
    let [click,setClick] = useState(false)
    let [click1,setClick1] = useState(false)
    let [click2,setClick2] = useState(false)

    let [interestPoints, setInterestPoints] = useState([WoodyArr])
    let [interestTexts,setInterestTexts] = useState([WoodyPointText])

    let handleClick = () => setClick(!click)
    let handleClick1 = () => setClick1(!click)
    let handleClick2 = () => setClick2(!click)

    let handleInterestPoints = async() => {
        let response = await axios.get('/nearest')
        let data = await response.data
    
        if(data == "WDF"){
            setInterestPoints(WoodyArr)
            setInterestTexts(WoodyPointText)
        }
        else if(data == "ARN"){
            setInterestPoints(ArnArr)
            setInterestTexts(ArnPointText)
        }
    }
    useEffect (()=>{
        handleInterestPoints()
        },[])
    
    return(
        <Layout>
            <Collage>
            <InterestPic src={interestPoints[0]} onClick={handleClick}>
            </InterestPic>
            <Popup trigger ={click}>
                <p>
                    {interestTexts[0]}
                </p>
            </Popup>

            <InterestPic src={interestPoints[1]} onClick={handleClick1}>
            </InterestPic>
            <Popup trigger ={click1}>
                <p>
                    {interestTexts[1]}
                </p>
            </Popup>

            <InterestPic src={interestPoints[2]} onClick={handleClick2}>
            </InterestPic>
            <Popup trigger ={click2}>
                <p>
                    {interestTexts[2]}
                </p>
            </Popup>
            </Collage>
        </Layout>
    )

}

export default InterestPoint