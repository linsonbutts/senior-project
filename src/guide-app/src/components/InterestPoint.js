import styled from 'styled-components'
import React,{useState, useEffect} from 'react'
import MuseumImage from '../assets/museum.jpg'
import SmallPop from './SmallPop'
import SpiritTime from '../assets/spiritTime.jpg'
import CafeImage from '../assets/cafe.jpg'
import ArchImage from '../assets/archives.jpg'
import SculptImage from '../assets/woodiSculpt.jpg'

/*let Collage = styled.div`
margin: 10px;
display: flex;
flex-direction: column;
justify-content: start;
`*/

let InterestPic = styled.img`
margin: 10px;
display: flexbox;
width: 250px;
height: 250px;
border-top-right-radius: 10px;
border-bottom-right-radius: 10px;
border-right: 10px solid rgba(240,0,0,0.6);
border-bottom: 10px solid rgba(240,0,0,0.6);
border-top: 10px solid rgba(240,0,0,0.6);
padding: 15px;
flex-basis: 25%;
`

let Break = styled.div`
display: flexbox;
flex-basis:100%;
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
    let handleClick1 = () => setClick1(!click1)
    let handleClick2 = () => setClick2(!click2)

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
        setInterval(handleInterestPoints,3000)
        handleInterestPoints()
        },[])
    
    return(
        <React.Fragment>

            <Break></Break>
            <Break></Break>
            <Break></Break>
            
            <InterestPic src={interestPoints[0]} onClick={handleClick}>
            </InterestPic>

            <SmallPop trigger ={click}>
                <p display="block">
                    {interestTexts[0]}
                </p>
            </SmallPop>


            <InterestPic src={interestPoints[1]} onClick={handleClick1}>
            </InterestPic>
            <SmallPop trigger ={click1}>
                <p>
                    {interestTexts[1]}
                </p>
            </SmallPop>

            <InterestPic src={interestPoints[2]} onClick={handleClick2}>
            </InterestPic>
            <SmallPop trigger ={click2}>
                <p>
                    {interestTexts[2]}
                </p>
            </SmallPop>

        </React.Fragment>
    )

}

export default InterestPoint