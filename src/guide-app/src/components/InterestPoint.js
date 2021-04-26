import styled from 'styled-components'
import React,{useState, useEffect} from 'react'
import MuseumImage from '../assets/museum.jpg'
import SmallPop from './SmallPop'
import SpiritTime from '../assets/spiritTime.jpg'
import CafeImage from '../assets/cafe.jpg'
import ArchImage from '../assets/archives.jpg'
import SculptImage from '../assets/woodiSculpt.jpg'
import JenkinsImage from '../assets/honors.jpg'

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
    `Woodi Café reopened in August 2018 after undergoing an extensive overhaul to update 
    the café’s look and offerings. Boasting new furniture and menu items, the farm-to-fork café serves a wide array of nutritious and affordable items such as tasty breakfast sandwiches, house-made pastries, chef-inspired soups and pastas and signature sandwiches and salads.

    The updated food service is part of the Library’s continuing effort 
    to enhance services for Atlanta University Center students, faculty and visitors. 
    Woodi Café is located on the main level of the AUC Woodruff Library
    
            Hours: 
        Sunday	    Closed,
        Monday	    9AM–9PM,
        Tuesday	    9AM–9PM,
        Wednesday	9AM–9PM,
        Thursday	9AM–9PM,
        Friday	    9AM–3:30PM,
        Saturday	Closed,
    `
,
`This is one of the many sculptures and art pieces within the Woodruff Library. 
Whether in the Library to study, research, or simply relax, our students and faculty 
experience vibrant art collections that are not only educationally enriching but also aesthetically pleasing. 
The striking art on display throughout the Library reflects the vision of our Knowledge & Arts Initiative, 
which is to promote student pride and ownership of the Library, convey the human experience, 
and inspire student thought and conversations through the visual arts.

Representing a broad spectrum of disciplines, including sculpture, paintings, drawings, and photography, 
the impressive works are created and loaned by artists from across the country.
Programs and tours on the art are offered throughout the year.`
,
`These are the archives of the Woodruff Library. The Archives Research Center has many individual, familial, and organizational collections. 
The archives are located on the upper level of the Library in the Virginia Lacy Jones Exhibition Hall. The archives collection can be viewed online
and similarly students can make appointments to view the archives.`
]
let ArnPointText = [
    `This is the sculpture Spiritual Time it can be found directly outside of Trevor Arnett hall, and was created by Spelman
    Professor: Frank Toby Martin. It was commissioned in 1996 to commemorate the Summer Olympics of that year.`
    ,
    `These are some pieces from the Clark Atlanta Art Museum, the works include contemporary works,Historic and Modern
    African American works, and African works. Regarding works historic to CAU the museum includes a series of murals known as the
    "Art of the Negro".The Art of the Negro mural series was painted by Hale Aspacio Woodruff (1900-1980) and 
    consists of six, 12 x 12 foot oil on canvas panels. Woodruff, founder of the Atlanta University art department 
    and permanent collection, painted the murals between 1950 and 1951. Woodruff aspired to providing 
    the university community with a global narrative on the cultural history of Africans in the Americas. Some of the notable
    artists that are included within the museum are the following: William H. Johnson, Charles White, Elizabeth Catlett, 
    Sam Gilliam, Jacob Lawrence, and Norman Lewis`
    ,
    `While the facilities are not pictured on our left thes are some of the students who are part of the Isabella T. Jenkins
    Honors Program, the related office is hosted within Trevor Arnett. The Honors Program is made available to freshman
    students who excelled in high school and is there to promote intellectual independence. They do require a minimum
    of 20 service hours to maintain membership each semester.`]

let WoodyArr = [CafeImage,SculptImage,ArchImage]
let ArnArr = [SpiritTime,MuseumImage,JenkinsImage]

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
        let response = await axios.get('https://60863dad7659baf639105ee8--sleepy-swartz-da47cf.netlify.app/.netlify/functions/server/nearest')
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