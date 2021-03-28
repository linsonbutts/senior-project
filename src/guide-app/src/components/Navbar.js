import React from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
   display: flex;
   width: 100%;
   height 75%;
   border-bottom: 20px solid rgba(150,150,150,0.7);
   padding: 0 20px;
   justify-content: space-between;
   color: white;
   background-color: rgba(240,0,0,0.6)
   ul{
       list-style: none;
       display: flex;
       flex-flow: row nowrap;
   }
   li{
       padding: 10px; 10px;
   }

`

const Navbar = () => {
    return(
        <Nav>
            <React.Fragment>
                <ul>
                    <li>
                        <a href='../App.js'>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href='../App.js'>
                            Data
                        </a>
                    </li>
                </ul>
            </React.Fragment>
        </Nav>
    )
}

export default Navbar