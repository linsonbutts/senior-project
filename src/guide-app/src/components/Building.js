import Popup from './Popup'
import styled from 'styled-components'
import React,{useState} from 'react'
import Woody from '../assets/library.jpg'
import Arnett from '../assets/arnett.jpg'
import Layout from './Layout'

let BuildingPic = styled.img`
border-radius: 75px;
border-left: 10px solid rgba(240,0,0,0.6);
border-top: 10px solid rgba(240,0,0,0.6);
border-bottom: 10px solid rgba(240,0,0,0.6);
padding: 20px;
float: left;
clear: left;
`

let Collage = styled.div`
align: right;
`
let buildingText = [`
This is Woodruff Library it is the campus library for blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
`,
`
This is Trevor Arnett it hosts the blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
`
]
let [click,setClick] = useState(false)
let [nearest, setNearest] = useState(Woody)
let [nearestText,setNearestText] = useState(buildingText[0])

let handleNearestText = () => {
    if(nearest == Woody){
        setNearest(buildingText[0])
    }
    else if(nearest == Arnett){
        setNearest(buildingText[1])
    }
}
let handleNearest = () => {

}
let handleClick = () => setClick(!click)

function Building(){
    return(
        <Layout>
            <BuildingPic src ={nearest}>
                <Popup trigger ={handleClick}>
                    <p>
                        {nearestText}
                    </p>
                </Popup>
            </BuildingPic>
        </Layout>
    )
}

export default Building